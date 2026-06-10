package com.hotelesrt.hotelesrt_backend.autenticacion;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
// <>
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AutenticacionController {
    @Autowired
    private AutenticacionService autenticacionService;




    // funcion privada para sacar el token 
    private String extraerToken(HttpServletRequest request){
        String cabecera = request.getHeader("Authotization");
        return cabecera.substring(7);
    }
    // operacion e registrar usuario 
    @PostMapping("/registro")
    public ResponseEntity<AuthResponse> registro(
            @Valid @RequestBody RegisterRequest request){
                String token = autenticacionService.registro(request);
                Usuario usuario = autenticacionService.obtenerPerfil(token);
                return ResponseEntity.ok(new AuthResponse(
                    usuario.getId(),
                    token,
                    usuario.getEmail(),
                    usuario.getNombre(),
                    usuario.getApellidos(),
                    usuario.getRol().name()
                    ));
            }
    // operacion de logear usuario
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
        @Valid @RequestBody LoginRequest request) {
        
            String token = autenticacionService.login(request);
            Usuario usuario = autenticacionService.obtenerPerfil(token);
            return ResponseEntity.ok(new AuthResponse(
                    usuario.getId(),
                    token,
                    usuario.getEmail(),
                    usuario.getNombre(),
                    usuario.getApellidos(),
                    usuario.getRol().name()
                    ));
    }
    
    // Obtener perfil 
    @GetMapping("/perfil")
    public ResponseEntity<Usuario> obtenerPerfil(
        HttpServletRequest request) {
        String token = extraerToken(request);
        return ResponseEntity.ok(autenticacionService.obtenerPerfil(token));
    }

    //Actualizar el perfil
    @PutMapping("/perfil")
    public ResponseEntity<Usuario> actualizarPerfil(
            HttpServletRequest request,
            @Valid @RequestBody RegisterRequest datos) {
        String token = extraerToken(request);
        return ResponseEntity.ok(autenticacionService.actualizarPerfil(token, datos));
            }

    
}
