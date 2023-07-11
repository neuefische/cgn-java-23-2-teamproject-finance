package de.teamprojectfinance.backend.security;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;



class MongoUserDetailsServiceTest {

    MongoUserRepository mongoUserRepository = mock(MongoUserRepository.class);

    MongoUserDetailsService mongoUserDetailsService = new MongoUserDetailsService(mongoUserRepository);

    @Test
    void WhenUserIsAvailable_ReturnUserDetails(){

        //Given
        MongoUser mongoUser = new MongoUser("123", "hans", "abc");
        String userName = "hans";
        UserDetails expected = new User(mongoUser.username(), mongoUser.password(), Collections.emptyList());
        //When
        Mockito.when(mongoUserRepository.findByUsername(userName))
                .thenReturn(Optional.ofNullable(mongoUser));
        //Then

        UserDetails actual = mongoUserDetailsService.loadUserByUsername(userName);
        assertEquals(expected, actual);
    }

}