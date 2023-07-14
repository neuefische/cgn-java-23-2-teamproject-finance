package de.teamprojectfinance.backend;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;


@Service
public class TransactionService {

    private final TransactionRepo transactionRepo;
    private final IdService idService;

    public TransactionService(TransactionRepo transactionRepo, IdService idService){
        this.transactionRepo = transactionRepo;
        this.idService = idService;
    }

    public Transaction addTransaction(TransactionWithNoId transactionWithNoId) {
        return transactionRepo.insert(new Transaction(idService.createRandomId(), transactionWithNoId.getDescription(), transactionWithNoId.getAmount(), transactionWithNoId.getCategory(), dtoTransaction.getDate()));
    }


    public List<Transaction> getAllTransactions() {
        return transactionRepo.findAll();
    }


    public Transaction updateTransaction(TransactionWithNoId transactionWithNoId, String id){

        return transactionRepo.save(new Transaction(id, transactionWithNoId.getDescription(),
                transactionWithNoId.getAmount(), transactionWithNoId.getCategory(), dtoTransaction.getDate()));
    }


    public void deleteTransaction(String id) {
        if (!transactionRepo.existsById(id)) throw new NoSuchElementException();
        transactionRepo.deleteById(id);
    }
}
