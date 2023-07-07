package de.teamprojectfinance.backend;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepo transactionRepo;
    private final IdService idService;

    public TransactionService(TransactionRepo transactionRepo, IdService idService){
        this.transactionRepo = transactionRepo;
        this.idService = idService;
    }

    public Transaction addTransaction(DtoTransaction dtoTransaction) {
        return transactionRepo.insert(new Transaction(idService.createRandomId(),dtoTransaction.getDescription(), dtoTransaction.getAmount(), dtoTransaction.getCategory()));
    }


    public List<Transaction> getAllTransactions() {
        return transactionRepo.findAll();
    }


    public Transaction updateTransaction(DtoTransaction dtoTransaction, String id){

        return transactionRepo.save(new Transaction(id,dtoTransaction.getDescription(), dtoTransaction.getAmount(), dtoTransaction.getCategory()));
    }


    public void deleteTransaction(String id) {
        transactionRepo.deleteById(id);
    }
}
