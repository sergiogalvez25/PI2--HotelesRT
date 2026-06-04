package com.hotelesrt.hotelesrt_backend.autenticacion;

public class AuthResponse {
    private String token;
    private String email;
    private String nombre;
    private String apellidos;
    private String rol;

    //Constructor
    public AuthResponse(String token,String email,
                        String nombre, String apellidos,
                        String rol){


        this.token = token;
        this.email = email;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.rol = rol;
     }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }
                        

     
}
