package de.teamprojectfinance.backend;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface TransactionRepo extends MongoRepository<Transaction, String> {


}
