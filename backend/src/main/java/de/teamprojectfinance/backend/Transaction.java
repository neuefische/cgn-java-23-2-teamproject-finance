package de.teamprojectfinance.backend;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class Transaction {

    private String id;

    private String description;

    private int amount;

    private TransactionCategory category;


}
