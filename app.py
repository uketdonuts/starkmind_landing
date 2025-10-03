from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import logging
from dotenv import load_dotenv
import brevo_python
from brevo_python.rest import ApiException

# Cargar variables de entorno
load_dotenv()

# Configurar Flask para servir React
app = Flask(__name__, 
            static_folder='static/static',
            static_url_path='/static')

# Habilitar CORS para desarrollo
CORS(app, origins=['http://localhost:3000'])

app.secret_key = os.getenv('SECRET_KEY', 'your-secret-key-here')

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Helper para enviar correos usando Brevo Python SDK
def send_mail(sender: str, recipients: list[str], subject: str, html: str, text: str) -> dict:
    """
    Enviar email usando la API de Brevo con el SDK de Python
    """
    try:
        # Configurar cliente Brevo
        configuration = brevo_python.Configuration()
        configuration.api_key['api-key'] = os.getenv('BREVO_API_KEY')
        api_instance = brevo_python.TransactionalEmailsApi(brevo_python.ApiClient(configuration))
        
        # Configurar remitente
        sender_config = {
            "name": "StarkMind",
            "email": sender
        }
        
        # Configurar destinatarios
        to_list = [{"email": email, "name": email.split('@')[0]} for email in recipients]
        
        # Configurar reply-to
        reply_to = {
            "name": "StarkMind Support",
            "email": sender
        }
        
        # Crear el email
        send_smtp_email = brevo_python.SendSmtpEmail(
            to=to_list,
            sender=sender_config,
            reply_to=reply_to,
            subject=subject,
            html_content=html,
            text_content=text
        )
        
        # Enviar el email
        api_response = api_instance.send_transac_email(send_smtp_email)
        
        # Retornar la respuesta
        return {
            'success': True,
            'message_id': api_response.message_id if hasattr(api_response, 'message_id') else None,
            'response': api_response
        }
        
    except ApiException as e:
        logger.error(f'Error API Brevo: {e}')
        raise Exception(f'Error en API Brevo: {e}')
    except Exception as e:
        logger.error(f'Error general enviando email: {e}')
        raise Exception(f'Error enviando email: {e}')

# API Routes
@app.route('/api/send-email', methods=['POST'])
def send_email():
    try:
        # Obtener datos del JSON request
        data = request.get_json()
        
        if not data:
            return jsonify({'success': False, 'message': 'No se recibieron datos'}), 400
        
        # Extraer campos del formulario
        nombre = data.get('nombre', '').strip()
        email = data.get('email', '').strip()
        empresa = data.get('empresa', '').strip()
        celular = data.get('celular', '').strip()
        mensaje = data.get('mensaje', '').strip()
        
        # Validar campos obligatorios
        if not all([nombre, email, mensaje]):
            return jsonify({'success': False, 'message': 'Los campos nombre, email y mensaje son obligatorios'}), 400
        
        # Validar formato de email básico
        if '@' not in email or '.' not in email:
            return jsonify({'success': False, 'message': 'Por favor ingresa un email válido'}), 400
        
        # Crear mensaje de notificación
        subject = f'🎯 LEAD PRIORITARIO - {nombre}'
        if empresa:
            subject += f' de {empresa}'
        
        # Template HTML simple
        notification_html = f"""
        <h1>🎯 Lead Prioritario - StarkMind</h1>
        <h2>Información del Prospecto</h2>
        <p><strong>Nombre:</strong> {nombre}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Empresa:</strong> {empresa if empresa else 'No especificada'}</p>
        <p><strong>Teléfono:</strong> {celular if celular else 'No proporcionado'}</p>
        <h2>Mensaje</h2>
        <p>{mensaje}</p>
        """
        
        # Versión texto plano
        notification_text = f"""
LEAD PRIORITARIO - STARKMIND

Nombre: {nombre}
Email: {email}
Empresa: {empresa if empresa else 'No especificada'}
Teléfono: {celular if celular else 'No proporcionado'}

Mensaje: {mensaje}
        """
        
        # Confirmación automática
        auto_reply_subject = f'✅ {nombre}, hemos recibido tu consulta - StarkMind'
        auto_reply_html = f"""
        <h1>¡Mensaje Recibido!</h1>
        <p>Hola {nombre},</p>
        <p>Gracias por contactar a StarkMind. Hemos recibido tu consulta y te contactaremos pronto.</p>
        <p>Respuesta garantizada en 24 horas.</p>
        <p>Saludos,<br>El equipo de StarkMind</p>
        """
        
        auto_reply_text = f"""
¡Mensaje Recibido!

Hola {nombre},

Gracias por contactar a StarkMind. Hemos recibido tu consulta y te contactaremos pronto.

Respuesta garantizada en 24 horas.

Saludos,
El equipo de StarkMind
        """
        
        # Enviar emails
        recipient_email = 'noelsantamaria@agendify.xyz'
        
        send_mail(
            sender=os.getenv('DEFAULT_FROM_EMAIL'),
            recipients=[recipient_email],
            subject=subject,
            html=notification_html,
            text=notification_text
        )
        
        send_mail(
            sender=os.getenv('DEFAULT_FROM_EMAIL'),
            recipients=[email],
            subject=auto_reply_subject,
            html=auto_reply_html,
            text=auto_reply_text
        )
        
        logger.info(f'Correos enviados exitosamente para {email} ({nombre})')
        
        return jsonify({
            'success': True, 
            'message': '¡Mensaje enviado correctamente! Revisa tu email y te contactaremos pronto.'
        })
    except Exception as e:
        logger.error(f'Error al enviar correo: {str(e)}')
        return jsonify({'success': False, 'message': 'Error interno del servidor. Por favor, intenta nuevamente.'}), 500

@app.route('/api/health')
def health_check():
    """Health check endpoint"""
    try:
        static_checks = {
            'index_html': os.path.exists('static/index.html'),
            'static_css': os.path.exists('static/static/css') and len([f for f in os.listdir('static/static/css') if f.endswith('.css')]) > 0,
            'static_js': os.path.exists('static/static/js') and len([f for f in os.listdir('static/static/js') if f.endswith('.js')]) > 0,
        }
        
        return jsonify({
            'status': 'healthy', 
            'service': 'StarkMind Landing',
            'static_files': static_checks,
            'all_static_ok': all(static_checks.values())
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'service': 'StarkMind Landing', 
            'error': str(e)
        }), 500

# Helper para servir React
def serve_react_app():
    """Helper para servir la aplicación React"""
    if os.path.exists('static/index.html'):
        return send_from_directory('static', 'index.html')
    else:
        return jsonify({'error': 'React build not found. Run npm build first.'}), 404

# Ruta principal para React
@app.route('/')
def index():
    """Servir la aplicación React desde build/index.html"""
    return serve_react_app()

# Rutas para archivos estáticos específicos
@app.route('/favicon.ico')
def favicon():
    """Servir favicon desde el directorio build"""
    return send_from_directory('static', 'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route('/manifest.json')
def manifest():
    """Servir manifest.json desde el directorio build"""
    return send_from_directory('static', 'manifest.json', mimetype='application/json')

@app.route('/robots.txt')
def robots():
    """Servir robots.txt desde el directorio build"""
    return send_from_directory('static', 'robots.txt', mimetype='text/plain')

# Ruta para servir archivos estáticos
@app.route('/static/<path:filename>')
def static_files(filename):
    """Servir archivos estáticos desde static/static con búsqueda en subdirectorios"""
    # Intentar servir directamente desde static/static
    if os.path.exists(os.path.join('static/static', filename)):
        return send_from_directory('static/static', filename)
    
    # Si no existe, intentar desde subdirectorios
    file_extension = filename.split('.')[-1].lower() if '.' in filename else ''
    
    if file_extension == 'css':
        css_path = os.path.join('static/static/css', os.path.basename(filename))
        if os.path.exists(css_path):
            return send_from_directory('static/static/css', os.path.basename(filename))
    elif file_extension == 'js':
        js_path = os.path.join('static/static/js', os.path.basename(filename))
        if os.path.exists(js_path):
            return send_from_directory('static/static/js', os.path.basename(filename))
    elif file_extension in ['png', 'jpg', 'jpeg', 'svg', 'gif']:
        media_path = os.path.join('static/static/media', os.path.basename(filename))
        if os.path.exists(media_path):
            return send_from_directory('static/static/media', os.path.basename(filename))
    
    # Si no se encuentra, retornar 404
    return "Static file not found", 404

# Catch-all route for React Router (SPA)
@app.route('/<path:path>')
def catch_all(path):
    """Manejar rutas de React Router en producción"""
    # Si la ruta contiene un punto, podría ser un archivo estático
    if '.' in path:
        file_extension = path.split('.')[-1].lower()
        
        # Archivos estáticos CSS y JS - buscar en subdirectorios
        if file_extension in ['js', 'css', 'map']:
            # Intentar primero la ruta completa
            if os.path.exists(os.path.join('static/static', path)):
                return send_from_directory('static/static', path)
            
            # Si no existe, buscar en subdirectorios css/ y js/
            if file_extension == 'css':
                css_path = os.path.join('static/static/css', os.path.basename(path))
                if os.path.exists(css_path):
                    return send_from_directory('static/static/css', os.path.basename(path))
            elif file_extension == 'js':
                js_path = os.path.join('static/static/js', os.path.basename(path))
                if os.path.exists(js_path):
                    return send_from_directory('static/static/js', os.path.basename(path))
            elif file_extension == 'map':
                # Buscar archivos .map en css/ y js/
                css_map_path = os.path.join('static/static/css', os.path.basename(path))
                js_map_path = os.path.join('static/static/js', os.path.basename(path))
                if os.path.exists(css_map_path):
                    return send_from_directory('static/static/css', os.path.basename(path))
                elif os.path.exists(js_map_path):
                    return send_from_directory('static/static/js', os.path.basename(path))
        
        # Archivos de media
        elif file_extension in ['png', 'jpg', 'jpeg', 'svg', 'ico', 'gif', 'woff', 'woff2', 'ttf', 'eot']:
            # Primero intentar desde static/static/media
            media_path = os.path.join('static/static/media', os.path.basename(path))
            if os.path.exists(media_path):
                return send_from_directory('static/static/media', os.path.basename(path))
            # Luego desde static/static
            elif os.path.exists(os.path.join('static/static', path)):
                return send_from_directory('static/static', path)
            # Finalmente desde static raíz
            elif os.path.exists(os.path.join('static', path)):
                return send_from_directory('static', path)
        
        # Si el archivo no se encuentra
        return "File not found", 404
    
    # Para rutas de React Router sin punto, servir index.html
    return serve_react_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=os.getenv('FLASK_DEBUG', 'False').lower() == 'true')
