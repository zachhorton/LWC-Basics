public class HomePageTaskLookup {
    
    @AuraEnabled(Cacheable=false)
    public static List<LookupSearchResult> searchForAccounts(String searchTerm, List<String> selectedIds) {
        String acctQuery = 'FIND :searchTerm IN NAME FIELDS RETURNING Account(Id, Name, BillingCity, BillingState, BillingCountry)';
        List<List<SObject>> acctResults = Search.query(acctQuery);
        

        List<LookupSearchResult> results = new List<LookupSearchResult>();
        String acctIcon = 'standard:account';

        Account[] accts = ((List<Account>) acctResults[0]);
        for (Account acct : accts) {
            results.add(
                new LookupSearchResult(
                    acct.Id,
                    'Account',
                    acctIcon,
                    acct.Name,
                    acct.BillingCity+', '+acct.BillingState+' '+acct.BillingCountry
                )
            );
        }

        return results;
    }
}