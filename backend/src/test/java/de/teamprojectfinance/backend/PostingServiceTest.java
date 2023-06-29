package de.teamprojectfinance.backend;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;


class PostingServiceTest {

    PostingRepo postingRepo = mock(PostingRepo.class);

    IdService idService = mock(IdService.class);
    PostingService postingService = new PostingService(postingRepo, idService);

    @Test
    void whenPostindAdded_ThenReturnPosting(){
        //Gvien

        PostingModel givenTestModel = new PostingModel("test", 23);
        PostingModel givenTestModel1 = new PostingModel("test", 23);
        givenTestModel1.setId("01A");

        //When
        Mockito.when(postingRepo.addPosting(givenTestModel))
                .thenReturn(givenTestModel);
        Mockito.when(idService.createRandomId())
                .thenReturn("01A");

        PostingModel actualModel = postingService.addPosting(givenTestModel);
        //Then
       assertEquals(givenTestModel1,actualModel );
       verify(postingRepo).addPosting(givenTestModel);

       verify(idService).createRandomId();

    }

}