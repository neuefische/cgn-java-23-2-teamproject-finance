package de.teamprojectfinance.backend;


import de.teamprojectfinance.backend.exceptions.ErrorMessage;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/finance/")
public class TransactionController {

    private final TransactionService transactionService;

    TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping
    List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }


    @PostMapping
    public Transaction addTransaction(@Valid @RequestBody TransactionWithNoId transactionWithNoId) {
        return transactionService.addTransaction(transactionWithNoId);
    }

    @PutMapping("{id}")
    public Transaction updateTransaction(@PathVariable("id") String id, @Valid @RequestBody TransactionWithNoId transactionWithNoId) {

        return transactionService.updateTransaction(transactionWithNoId, id);

    }

    @DeleteMapping("{id}")
    public void deleteTransaction(@PathVariable("id") String id) {
        transactionService.deleteTransaction(id);
    }


    @ExceptionHandler({NoSuchElementException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorMessage handleException() {
        return new ErrorMessage("Invalid input! ");
    }




}