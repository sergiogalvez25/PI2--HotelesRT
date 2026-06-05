package com.hotelesrt.hotelesrt_backend.hotel;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.jetbrains.exported.JBRApi.Service;




// <>



@Service
public class HotelService{
    @Autowired
    private HotelRepository hotelRepository;


    // funciones 

    //buscar hoteles activos
    public List<Hotel> listarHoteles(){
        return hotelRepository.findByActivoTrue();
    }
    // buscar un hotel concreto con el id
    public Hotel obtenerHotel(Long id){
        return hotelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hotel no encontrado con el id:" id));

    }
    //buscar hoteles por ciudad
    public List<Hotel> buscarPorCiudad(String ciudad) {
        return hotelRepository.findByCiudadAndActivoTrue(ciudad);
    }
    public List<Hotel>buscarPorFiltros(String ciudad, boolean piscina, boolean gimnasio) {
        return hotelRepository.findByFiltros(ciudad, piscina, gimnasio);
    }
    //buscar por estrellas minimas
    public List<Hotel> buscarPorEstrellasMinimas(Integer estrellas) {
        return hotelRepository.findByEstrellasMinimas(estrellas);
    }

    // obtiene la ruta de la BD en SQlite de un hotel en concreto
    public String obtenerRutaBD(Long hotel_id){
        String ruta = hotelRepository.findRutaBDByHotelID(hotel_id);
        if(ruta == null) {
            throw new RuntimeException(
                "No se encontró la BD del hotel con id: " + hotel_id);
            
        }
        return ruta;
    }
}