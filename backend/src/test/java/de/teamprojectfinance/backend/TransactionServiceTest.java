package de.teamprojectfinance.backend;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;


import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;


class TransactionServiceTest {

    TransactionRepo transactionRepo = mock(TransactionRepo.class);

    IdService idService = mock(IdService.class);
    TransactionService transactionService = new TransactionService(transactionRepo, idService);

    @Test
    void whenTransactionAdded_ThenReturnTransaction() {
        //Gvien

        TransactionWithNoId givenTestModel = new TransactionWithNoId("test", 23, TransactionCategory.INCOME);
        Transaction givenTestModelRepo = new Transaction("01A", "test", 23, TransactionCategory.INCOME);
        Transaction givenTestModel1 = new Transaction("01A", "test", 23, TransactionCategory.INCOME);


        //When
        Mockito.when(transactionRepo.insert(givenTestModelRepo))
                .thenReturn(givenTestModelRepo);
        Mockito.when(idService.createRandomId())
                .thenReturn("01A");

        Transaction actualModel = transactionService.addTransaction(givenTestModel);
        //Then
        verify(transactionRepo).insert(givenTestModelRepo);
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

    @Test
    void whenUpdateATransactionReturnUpdatedTransaction(){
        //Given
        TransactionWithNoId transactionWithNoId = new TransactionWithNoId("test", 42, TransactionCategory.INCOME);
        String id = "0123";
        //When

        Mockito.when(transactionRepo.save(new Transaction(id, transactionWithNoId.getDescription(), transactionWithNoId.getAmount(), transactionWithNoId.getCategory())))
                .thenReturn(new Transaction("0123", "test", 13, TransactionCategory.INCOME));
        Transaction expected = new Transaction("0123", "test", 13, TransactionCategory.INCOME);
        Transaction actual = transactionService.updateTransaction(transactionWithNoId, id);
        //Then
        verify(transactionRepo).save(any());
        assertEquals(expected, actual);
    }

    @Test
    void deleteTransactionWhenTransactionIsExisting(){
        //given
        String id = "abc";
        //when
        transactionService.deleteTransaction(id);
        //then
        verify(transactionRepo).deleteById(id);
    }
}