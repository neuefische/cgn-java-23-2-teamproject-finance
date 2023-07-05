package de.teamprojectfinance.backend;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;


class TransactionServiceTest {

    TransactionRepo postingRepo = mock(TransactionRepo.class);

    IdService idService = mock(IdService.class);
    TransactionService postingService = new TransactionService(postingRepo, idService);

 @Test
 void whenPostindAdded_ThenReturnPosting() {
     //Gvien

     DtoTransaction givenTestModel = new DtoTransaction("test", 23, TransactionCategory.INCOME);
     Transaction givenTestModelRepo = new Transaction("01A", "test", 23, TransactionCategory.INCOME);
     Transaction givenTestModel1 = new Transaction("01A", "test", 23, TransactionCategory.INCOME);


     //When
     Mockito.when(postingRepo.addPosting(givenTestModelRepo))
             .thenReturn(givenTestModelRepo);
     Mockito.when(idService.createRandomId())
             .thenReturn("01A");

     Transaction actualModel = postingService.addPosting(givenTestModel);
     //Then
     verify(postingRepo).addPosting(givenTestModelRepo);
     verify(idService).createRandomId();
     assertEquals(givenTestModel1, actualModel);


 }
@Test
    void whenListNotEmpty_ThenReturnList(){
     // Given
    Transaction givenTestModelRepo = new Transaction("2B", "test2", 23, TransactionCategory.INCOME);
    Transaction givenTestModel1 = new Transaction("3C", "test3", 23, TransactionCategory.EXPENSE);
    List<Transaction> givenTestPostigModel = new ArrayList<>(List.of(givenTestModel1,givenTestModelRepo));
     // When
        Mockito.when(postingRepo.getAllPostings())
                .thenReturn(givenTestPostigModel);
        List<Transaction> actualModelList = postingService.getAllPostings();
     // Then
    verify(postingRepo).getAllPostings();
    assertEquals(givenTestPostigModel,actualModelList);

}
}