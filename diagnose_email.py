#!/usr/bin/env python3
"""
Script de diagnóstico completo para el sistema de correos de StarkMind
"""

import smtplib
import socket
import ssl
import os
from datetime import datetime
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def check_smtp_connectivity():
    """Verifica la conectividad con el servidor SMTP de Zoho"""
    
    print("🔍 DIAGNÓSTICO DE CONECTIVIDAD SMTP")
    print("=" * 40)
    
    smtp_server = "smtp.zoho.com"
    smtp_port = 465
    
    print(f"📡 Probando conexión a {smtp_server}:{smtp_port}")
    
    try:
        # Verificar resolución DNS
        print("🔍 Resolviendo DNS...")
        ip = socket.gethostbyname(smtp_server)
        print(f"✅ DNS resuelto: {smtp_server} -> {ip}")
        
        # Verificar conectividad de red
        print("🌐 Verificando conectividad de red...")
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(10)
        result = sock.connect_ex((smtp_server, smtp_port))
        sock.close()
        
        if result == 0:
            print("✅ Conectividad de red: OK")
            
            # Intentar conexión SMTP
            print("📧 Verificando conexión SMTP...")
            context = ssl.create_default_context()
            
            try:
                server = smtplib.SMTP_SSL(smtp_server, smtp_port, context=context)
                server.set_debuglevel(0)  # Sin debug para output limpio
                
                # Obtener info del servidor
                status, response = server.noop()
                print(f"✅ Conexión SMTP establecida: {status} - {response.decode()}")
                
                server.quit()
                return True
                
            except smtplib.SMTPException as e:
                print(f"❌ Error SMTP: {str(e)}")
                return False
                
        else:
            print(f"❌ No se puede conectar al puerto {smtp_port}: Error {result}")
            return False
            
    except socket.gaierror as e:
        print(f"❌ Error DNS: {str(e)}")
        return False
    except Exception as e:
        print(f"❌ Error inesperado: {str(e)}")
        return False

def test_smtp_auth():
    """Prueba la autenticación SMTP con las credenciales"""
    
    print("\n🔐 PRUEBA DE AUTENTICACIÓN SMTP")
    print("=" * 35)
    
    smtp_server = "smtp.zoho.com"
    smtp_port = 465
    username = os.getenv('ZOHO_EMAIL')
    password = os.getenv('ZOHO_PASSWORD')
    
    if not username or not password:
        print("❌ Credenciales no encontradas en variables de entorno")
        return False
    
    print(f"👤 Usuario: {username}")
    print(f"🔑 Password: {'*' * len(password)}")
    
    try:
        context = ssl.create_default_context()
        server = smtplib.SMTP_SSL(smtp_server, smtp_port, context=context)
        
        print("🔍 Intentando autenticación...")
        server.login(username, password)
        print("✅ Autenticación exitosa")
        
        server.quit()
        return True
        
    except smtplib.SMTPAuthenticationError as e:
        print(f"❌ Error de autenticación: {str(e)}")
        print("💡 Verifica que las credenciales sean correctas")
        print("💡 Asegúrate de que la autenticación SMTP esté habilitada en Zoho")
        return False
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False

def test_alternative_ports():
    """Prueba puertos alternativos para SMTP"""
    
    print("\n🔄 PROBANDO PUERTOS ALTERNATIVOS")
    print("=" * 35)
    
    smtp_server = "smtp.zoho.com"
    ports = [587, 465, 25]  # TLS, SSL, y puerto estándar
    
    for port in ports:
        print(f"\n📡 Probando puerto {port}...")
        
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.settimeout(5)
            result = sock.connect_ex((smtp_server, port))
            sock.close()
            
            if result == 0:
                print(f"✅ Puerto {port}: Conectividad OK")
                
                # Probar SMTP en este puerto
                try:
                    if port == 465:
                        # SSL
                        context = ssl.create_default_context()
                        server = smtplib.SMTP_SSL(smtp_server, port, context=context)
                    else:
                        # TLS o plano
                        server = smtplib.SMTP(smtp_server, port)
                        if port == 587:
                            server.starttls()
                    
                    status, response = server.noop()
                    print(f"✅ SMTP funcional en puerto {port}")
                    server.quit()
                    
                except Exception as e:
                    print(f"❌ SMTP no funcional en puerto {port}: {str(e)}")
            else:
                print(f"❌ Puerto {port}: No conecta")
                
        except Exception as e:
            print(f"❌ Error probando puerto {port}: {str(e)}")

def check_env_config():
    """Verifica la configuración del entorno"""
    
    print("\n⚙️  VERIFICACIÓN DE CONFIGURACIÓN")
    print("=" * 35)
    
    required_vars = ['ZOHO_EMAIL', 'ZOHO_PASSWORD', 'FLASK_ENV']
    
    for var in required_vars:
        value = os.getenv(var)
        if value:
            if 'PASSWORD' in var:
                print(f"✅ {var}: {'*' * len(value)}")
            else:
                print(f"✅ {var}: {value}")
        else:
            print(f"❌ {var}: No configurado")

def test_simple_email():
    """Envía un correo de prueba simple"""
    
    print("\n📧 PRUEBA DE ENVÍO SIMPLE")
    print("=" * 30)
    
    smtp_server = "smtp.zoho.com"
    smtp_port = 587  # Probemos TLS en lugar de SSL
    username = os.getenv('ZOHO_EMAIL')
    password = os.getenv('ZOHO_PASSWORD')
    
    if not username or not password:
        print("❌ Credenciales no disponibles")
        return False
    
    try:
        # Crear mensaje simple
        msg = MIMEText(f"Test email enviado el {datetime.now()}")
        msg['Subject'] = "Prueba de correo - StarkMind"
        msg['From'] = username
        msg['To'] = username  # Enviarse a sí mismo
        
        print(f"📤 Enviando correo de prueba a {username}...")
        
        # Conectar y enviar
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()  # Habilitar TLS
        server.login(username, password)
        
        text = msg.as_string()
        server.sendmail(username, [username], text)
        server.quit()
        
        print("✅ Correo enviado exitosamente")
        return True
        
    except Exception as e:
        print(f"❌ Error enviando correo: {str(e)}")
        return False

def main():
    """Función principal de diagnóstico"""
    
    print("🔧 DIAGNÓSTICO COMPLETO DEL SISTEMA DE CORREOS")
    print("=" * 50)
    print(f"📅 Fecha: {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}")
    
    # Cargar variables de entorno
    from dotenv import load_dotenv
    load_dotenv()
    
    # Ejecutar diagnósticos
    results = []
    
    results.append(("Configuración", check_env_config()))
    results.append(("Conectividad SMTP", check_smtp_connectivity()))
    test_alternative_ports()
    results.append(("Autenticación", test_smtp_auth()))
    results.append(("Envío simple", test_simple_email()))
    
    # Resumen
    print("\n" + "=" * 50)
    print("📊 RESUMEN DEL DIAGNÓSTICO")
    print("=" * 50)
    
    for test_name, result in results:
        if result is None:
            continue
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} {test_name}")
    
    # Recomendaciones
    print("\n💡 RECOMENDACIONES:")
    print("1. Si la conectividad falla, verifica firewall/proxy")
    print("2. Si la autenticación falla, revisa credenciales en Zoho")
    print("3. Considera usar puerto 587 con TLS en lugar de 465 SSL")
    print("4. Verifica que SMTP esté habilitado en tu cuenta Zoho")

if __name__ == "__main__":
    main()
