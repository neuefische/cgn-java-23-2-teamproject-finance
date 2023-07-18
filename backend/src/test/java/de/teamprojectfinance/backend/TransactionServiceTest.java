package de.teamprojectfinance.backend;

import org.junit.jupiter.api.Test;


import java.util.List;
import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;


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
        when(transactionRepo.insert(givenTestModelRepo))
                .thenReturn(givenTestModelRepo);
        when(idService.createRandomId())
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
        when(transactionRepo.findAll())
                .thenReturn(transactions);
        List<Transaction> actualModelList = transactionService.getAllTransactions();
        // Then
        verify(transactionRepo).findAll();
        assertEquals(transactions, actualModelList);

    }

    @Test
    void whenUpdateATransactionReturnUpdatedTransaction() {
        //Given
        TransactionWithNoId transactionWithNoId = new TransactionWithNoId("test", 42, TransactionCategory.INCOME);
        String id = "0123";
        //When

        when(transactionRepo.save(new Transaction(id, transactionWithNoId.getDescription(), transactionWithNoId.getAmount(), transactionWithNoId.getCategory())))
                .thenReturn(new Transaction("0123", "test", 13, TransactionCategory.INCOME));
        Transaction expected = new Transaction("0123", "test", 13, TransactionCategory.INCOME);
        Transaction actual = transactionService.updateTransaction(transactionWithNoId, id);
        //Then
        verify(transactionRepo).save(any());
        assertEquals(expected, actual);
    }

    @Test
    void deleteTransactionWhenTransactionIsNotExisting() {
        //given

        String id = "abc";
        //when


        assertThrows(NoSuchElementException.class, () -> transactionService.deleteTransaction(id));


    }

    @Test
    void deleteTransactionWhenTransactionIsExisting() {
        //given
        String id = "abc";
        //when
        when(transactionRepo.existsById(id))
                .thenReturn(true);
        doNothing().when(transactionRepo).deleteById("123");
        transactionService.deleteTransaction(id);
        //then
        verify(transactionRepo).deleteById(id);

    }
}
