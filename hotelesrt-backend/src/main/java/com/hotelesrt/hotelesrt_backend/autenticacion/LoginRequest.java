package com.hotelesrt.hotelesrt_backend.autenticacion;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class LoginRequest {
    @Email(message="El email no es valido")
    @NotBlank(message = "El email es obligatorio")
     private String email;


    @NotBlank(message = "La contraseña es obligatoria")
    private String password;


    public String getPassword() {
        return password;
    }


    public void setPassword(String password) {
        this.password = password;
    }
    public String getEmail() {
        return email;
    }


    public void setEmail(String email) {
        this.email = email;
    }
}
