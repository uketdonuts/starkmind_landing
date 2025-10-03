#!/usr/bin/env python3
"""
Script de prueba principal para el sistema de emails de StarkMind
Utiliza Brevo como único proveedor de servicios de email
"""

import os
import sys
from datetime import datetime
from dotenv import load_dotenv
import brevo_python
from brevo_python.rest import ApiException
from pprint import pprint

# Cargar variables de entorno
load_dotenv()

def test_email_system():
    """Función para probar el sistema completo de emails con Brevo"""
    
    print("📧 INICIANDO TEST DEL SISTEMA DE EMAILS - STARKMIND")
    print("=" * 65)
    
    # Verificar API key
    api_key = os.getenv('BREVO_API_KEY')
    sender_email = os.getenv('DEFAULT_FROM_EMAIL', 'noreply@starkmind.xyz')
    
    if not api_key:
        print("❌ ERROR: BREVO_API_KEY no configurada")
        return False
    
    print(f"✅ API Key encontrada: {api_key[:15]}...")
    print(f"✅ Sender email: {sender_email}")
    print(f"🎯 Destinatario de prueba: uketdonuts@hotmail.com")
    print(f"🔧 Proveedor: Brevo (único servicio configurado)")
    print()
    
    try:
        # Configurar la API key
        configuration = brevo_python.Configuration()
        configuration.api_key['api-key'] = api_key
        
        # Crear instancia del cliente
        api_instance = brevo_python.TransactionalEmailsApi(brevo_python.ApiClient(configuration))
        
        # Datos de prueba
        test_data = {
            'nombre': 'Test Usuario StarkMind',
            'email': 'test@example.com',
            'empresa': 'Test Company StarkMind',
            'celular': '+1234567890',
            'mensaje': 'Este es un mensaje de prueba del sistema principal de emails de StarkMind usando Brevo como único proveedor.'
        }
        
        # Configurar el email
        subject = f'📧 TEST SISTEMA EMAILS - {test_data["nombre"]} | {datetime.now().strftime("%H:%M:%S")}'
        
        # Sender configuration
        sender = {
            "name": "StarkMind",
            "email": sender_email
        }
        
        # Reply-to configuration
        reply_to = {
            "name": "StarkMind Support", 
            "email": sender_email
        }
        
        # HTML content para el test
        html_content = f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Test Brevo Python - StarkMind</title>
    <style>
        body {{ 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            margin: 40px; 
            color: #333; 
            background: #f8fafc;
        }}
        .container {{
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }}
        .header {{ 
            background: linear-gradient(135deg, #0ea5e9, #0284c7); 
            color: white; 
            padding: 30px; 
            text-align: center; 
        }}
        .content {{ 
            padding: 30px; 
        }}
        .success {{ 
            color: #059669; 
            font-weight: bold; 
            font-size: 18px;
            margin-bottom: 20px;
        }}
        .info {{ 
            background: #e0f2fe; 
            padding: 20px; 
            border-radius: 8px; 
            margin: 20px 0; 
            border-left: 4px solid #0ea5e9;
        }}
        .data-grid {{
            background: #f8fafc;
            padding: 20px;
            border-radius: 8px;
            margin: 15px 0;
        }}
        .data-item {{
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e2e8f0;
        }}
        .data-item:last-child {{
            border-bottom: none;
        }}
        .label {{
            font-weight: 600;
            color: #64748b;
        }}
        .value {{
            color: #1e293b;
            font-weight: 500;
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📧 TEST SISTEMA EMAILS EXITOSO</h1>
            <p>Prueba del sistema principal de emails StarkMind → Brevo</p>
        </div>
        
        <div class="content">
            <p class="success">✅ ¡El sistema principal de emails de StarkMind está funcionando correctamente!</p>
            
            <div class="info">
                <h3>📊 Información del Test</h3>
                <div class="data-grid">
                    <div class="data-item">
                        <span class="label">Timestamp:</span>
                        <span class="value">{datetime.now().strftime('%d/%m/%Y %H:%M:%S')}</span>
                    </div>
                    <div class="data-item">
                        <span class="label">Sistema:</span>
                        <span class="value">StarkMind Email System</span>
                    </div>
                    <div class="data-item">
                        <span class="label">Proveedor:</span>
                        <span class="value">Brevo (único servicio)</span>
                    </div>
                    <div class="data-item">
                        <span class="label">Sender:</span>
                        <span class="value">{sender_email}</span>
                    </div>
                    <div class="data-item">
                        <span class="label">Destinatario:</span>
                        <span class="value">uketdonuts@hotmail.com</span>
                    </div>
                    <div class="data-item">
                        <span class="label">API Key:</span>
                        <span class="value">{api_key[:20]}...</span>
                    </div>
                </div>
            </div>
            
            <div class="info">
                <h3>📝 Datos de Prueba</h3>
                <div class="data-grid">
                    <div class="data-item">
                        <span class="label">Nombre:</span>
                        <span class="value">{test_data['nombre']}</span>
                    </div>
                    <div class="data-item">
                        <span class="label">Email:</span>
                        <span class="value">{test_data['email']}</span>
                    </div>
                    <div class="data-item">
                        <span class="label">Empresa:</span>
                        <span class="value">{test_data['empresa']}</span>
                    </div>
                    <div class="data-item">
                        <span class="label">Teléfono:</span>
                        <span class="value">{test_data['celular']}</span>
                    </div>
                </div>
                <p style="margin-top: 15px; font-style: italic; color: #64748b;">
                    <strong>Mensaje:</strong> {test_data['mensaje']}
                </p>
            </div>
            
            <p style="margin-top: 30px; font-style: italic; color: #64748b; text-align: center;">
                Este es un email de prueba para verificar que la integración con Brevo Python funciona correctamente.
            </p>
        </div>
    </div>
</body>
</html>
        """
        
        # Destinatario
        to = [{"email": "uketdonuts@hotmail.com", "name": "Test Usuario"}]
        
        print("📧 Enviando email de prueba...")
        print(f"   Subject: {subject}")
        print(f"   From: {sender['name']} <{sender['email']}>")
        print(f"   To: uketdonuts@hotmail.com")
        print()
        
        # Configurar el email usando la nueva API
        send_smtp_email = brevo_python.SendSmtpEmail(
            to=to,
            sender=sender,
            reply_to=reply_to,
            subject=subject,
            html_content=html_content
        )
        
        # Enviar el email
        api_response = api_instance.send_transac_email(send_smtp_email)
        
        print("📬 RESPUESTA DE BREVO PYTHON:")
        pprint(api_response)
        print()
        
        if api_response and hasattr(api_response, 'message_id'):
            print("✅ EMAIL ENVIADO EXITOSAMENTE!")
            print(f"🆔 Message ID: {api_response.message_id}")
            print(f"🎯 Revisa la bandeja de entrada de: uketdonuts@hotmail.com")
            print()
            print("📋 RESUMEN DEL TEST:")
            print(f"   ✓ API Key válida")
            print(f"   ✓ Conexión a Brevo exitosa")
            print(f"   ✓ Email enviado correctamente")
            print(f"   ✓ Sistema: StarkMind Email (Brevo)")
            return True
        else:
            print("❌ ERROR: Respuesta inesperada")
            print(f"   Respuesta: {api_response}")
            return False
            
    except ApiException as e:
        print(f"❌ ERROR API BREVO: {e}")
        if hasattr(e, 'status'):
            print(f"   Status: {e.status}")
        if hasattr(e, 'reason'):
            print(f"   Reason: {e.reason}")
        if hasattr(e, 'body'):
            print(f"   Body: {e.body}")
        return False
    except Exception as e:
        print(f"❌ ERROR GENERAL: {str(e)}")
        print(f"   Tipo de error: {type(e).__name__}")
        return False

if __name__ == "__main__":
    print("🚀 INICIANDO TEST DEL SISTEMA DE EMAILS - STARKMIND")
    print(f"⏰ Timestamp: {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}")
    print()
    
    success = test_email_system()
    
    print()
    print("=" * 65)
    if success:
        print("🎉 TEST COMPLETADO EXITOSAMENTE!")
        print("✅ El sistema de emails de StarkMind está funcionando correctamente")
        sys.exit(0)
    else:
        print("💥 TEST FALLÓ!")
        print("❌ Revisa la configuración del sistema de emails")
        sys.exit(1)
