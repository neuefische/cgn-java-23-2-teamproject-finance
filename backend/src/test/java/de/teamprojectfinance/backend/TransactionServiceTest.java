package de.teamprojectfinance.backend;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;


class TransactionServiceTest {

    TransactionRepo transactionRepo = mock(TransactionRepo.class);

    IdService idService = mock(IdService.class);
    TransactionService transactionService = new TransactionService(transactionRepo, idService);

    @Test
    void whenTransactionAdded_ThenReturnTransaction() {
        //Gvien

        DtoTransaction givenTestModel = new DtoTransaction("test", 23, TransactionCategory.INCOME);
        Transaction givenTestModelRepo = new Transaction("01A", "test", 23, TransactionCategory.INCOME);
        Transaction givenTestModel1 = new Transaction("01A", "test", 23, TransactionCategory.INCOME);


        //When
        Mockito.when(transactionRepo.save(givenTestModelRepo))
                .thenReturn(givenTestModelRepo);
        Mockito.when(idService.createRandomId())
                .thenReturn("01A");

        Transaction actualModel = transactionService.addTransaction(givenTestModel);
        //Then
        verify(transactionRepo).save(givenTestModelRepo);
        verify(idService).createRandomId();
        assertEquals(givenTestModel1, actualModel);


    }

    @Test
    void whenListNotEmpty_ThenReturnList() {
        // Given
        List<Transaction> transactions = List.of(
                new Transaction("2B", "test2", 23, TransactionCategory.INCOME),
                new Transaction("3C", "test3", 23, TransactionCategory.EXPENSE)
        );




        // When
        Mockito.when(transactionRepo.findAll())
                .thenReturn(transactions);
        List<Transaction> actualModelList = transactionService.getAllTransactions();
        // Then
        verify(transactionRepo).findAll();
        assertEquals(transactions, actualModelList);

    }
}