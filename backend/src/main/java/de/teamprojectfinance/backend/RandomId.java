package de.teamprojectfinance.backend;

import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class RandomId {

    public RandomId(){

    }

    public  String createRandomId(){
        return UUID.randomUUID().toString();
    }
}
