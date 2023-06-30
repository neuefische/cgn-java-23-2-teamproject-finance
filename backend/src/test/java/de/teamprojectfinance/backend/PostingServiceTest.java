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
 void whenPostindAdded_ThenReturnPosting() {
     //Gvien

     NewPostingModel givenTestModel = new NewPostingModel("test", 23);
     PostingModel givenTestModelRepo = new PostingModel("01A", "test", 23);
     PostingModel givenTestModel1 = new PostingModel("01A", "test", 23);


     //When
     Mockito.when(postingRepo.addPosting(givenTestModelRepo))
             .thenReturn(givenTestModelRepo);
     Mockito.when(idService.createRandomId())
             .thenReturn("01A");

     PostingModel actualModel = postingService.addPosting(givenTestModel);
     //Then
     verify(postingRepo).addPosting(givenTestModelRepo);
     verify(idService).createRandomId();
     assertEquals(givenTestModel1, actualModel);


 }


}