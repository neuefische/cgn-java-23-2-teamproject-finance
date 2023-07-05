package de.teamprojectfinance.backend;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DtoTransaction {

    private String description;

    private int amount;

    private TransactionCategory category;

}
