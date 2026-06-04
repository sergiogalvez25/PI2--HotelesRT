package com.hotelesrt.hotelesrt_backend.autenticacion;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class RegisterRequest {
    @NotBlank(message = "El nombre es obligatorio")
    private String nombre; 
    @NotBlank(message = "Los apellidos son obligatorios")
    private String apellidos;
     @Email(message="El email no es valido")
     @NotBlank(message = "El email es obligatorio")
     private String email;

    @Size(min = 6, message = "La contraseña debe tener 6 caracteres mínimo.")
    @NotBlank(message = "La contraseña es obligatoria")
    private String password;
    private String telefono;
    private String direccion;
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
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getTelefono() {
        return telefono;
    }
    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }
    public String getDireccion() {
        return direccion;
    }
    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }
}
