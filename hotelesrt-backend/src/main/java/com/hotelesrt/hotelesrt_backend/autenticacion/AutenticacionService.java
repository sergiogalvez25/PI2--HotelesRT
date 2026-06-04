package com.hotelesrt.hotelesrt_backend.autenticacion;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AutenticacionService {
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private PasswordEncoder encriptador;
    

    // funciones de registro, login, etc
    public String registro(RegisterRequest request) {
        if(usuarioRepository.existsByEmail(request.getEmail())){
            throw new RuntimeException("El email ya está registrado");
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre());
        usuario.setApellidos(request.getApellidos());
        usuario.setEmail(request.getEmail());
        usuario.setPassword(encriptador.encode(request.getPassword()));
        usuario.setTelefono(request.getTelefono());
        usuario.setDireccion(request.getDireccion());
        usuario.setRol(Rol.CLIENTE_HOTEL);
        usuario.setFechaRegistro(LocalDate.now());
        usuario.setActivo(true);
        
        usuarioRepository.save(usuario);
        return jwtUtil.generarToken(usuario);
    }

    //login

    public String login(LoginRequest request) {

        Usuario usuario = usuarioRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Email no encontrado"));
        if(!encriptador.matches(request.getPassword(), usuario.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }
        if(!usuario.isActivo()) {
            throw new RuntimeException("Cuenta desactivada");
        }
        return jwtUtil.generarToken(usuario);
    }


    // obtener el perfil
    public Usuario obtenerPerfil(String token) {
        String email = jwtUtil.extraerEmail(token);
        return usuarioRepository
                .findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    // Actualizar perfil
    public Usuario actualizarPerfil(String token, RegisterRequest request) {
        Long id = jwtUtil.extraerID(token);

        Usuario usuario = usuarioRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        usuario.setNombre(request.getNombre());
        usuario.setApellidos(request.getApellidos());
        usuario.setTelefono(request.getTelefono());
        usuario.setDireccion(request.getDireccion());

        return usuarioRepository.save(usuario);
    }




}
