package de.teamprojectfinance.backend;

import java.util.UUID;

public class RandomId {



    public static String createRandomId(){
        return UUID.randomUUID().toString();
    }
}
