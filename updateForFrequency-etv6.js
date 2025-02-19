/* START Updated by 4Site on 2025-02-19 */
/* REF: https://app.productive.io/2650-4site-interactive-studios-inc/tasks/10499330 */
/* Used on Page Template: IS - Edge Template V6 - FY23 Source Code Modifier - Monthly Arrow - Orange Frequency Button - Fee */

// Used by updateForFrequency, but outside of it so it only gets set once on pageload
var crossReferenceValue = getUrlParameter('transaction.othamt1') || $("input[name='transaction.othamt1']").val();

if (crossReferenceValue){
    var singleCrossReferenceValue = crossReferenceValue.substring(0, 6) + "S" + crossReferenceValue.substring(7);
    var monthlyCrossReferenceValue = crossReferenceValue.substring(0, 6) + "R" + crossReferenceValue.substring(7);
}

function updateForFrequency(freq, askchanged) {
    // Validate frequency parameter is either 'monthly' or 'one-time'
    if (typeof freq !== 'string' || !['monthly', 'one-time'].includes(freq)) {
        console.error('Invalid frequency value');
        return;
    }

    // This "callOutSelection" functional call is not included on some versions of the "updateForFrequency" function.
    // callOutSelection(freq);

    // Determine currently selected donation amount from radio buttons or 'Other' input
    var currentSelectAmount;
    $('.en__field--donationAmt input[type="radio"]').each(function() {
        if ($(this).is(':checked')) {
            currentSelectAmount = $(this).val() !== 'Other' 
                ? $(this).val()
                : $('.en__field__input--other').val();
        }
    });

    // Configure recurring payment settings based on frequency selection
    if (freq === "monthly") {
        $('input[name="transaction.recurrpay"]').val('Y');
        $('input[name="transaction.recurrfreq"]').val('MONTHLY');
        $("input[name='transaction.othamt1']").val(monthlyCrossReferenceValue);
    } else if (freq === "one-time") {
        $('input[name="transaction.recurrpay"]').val('');
        $('input[name="transaction.recurrfreq"]').val('');
        $("input[name='transaction.othamt1']").val(singleCrossReferenceValue);
    }

    // If askchanged is true, update donation amount UI after frequency change
    if (askchanged) {
        setTimeout(function() {
            var found = false;
            
            // Reset all radio buttons and check the one matching current amount
            $('.en__field--donationAmt input[type="radio"]').each(function() {
                $(this).prop('checked', false);
                if ($(this).val() === currentSelectAmount) {
                    $(this).prop('checked', true);
                    $('.en__field__input--other').removeClass('hasvalue');
                    found = true;
                }
            });

            // If no matching radio button found, select 'Other' and set custom amount
            if (!found) {
                $('.en__field--donationAmt input[value="Other"]').prop('checked', true);
                $('.en__field__input--other')
                    .val(currentSelectAmount)
                    .addClass('hasvalue');
            }
        }, 0);
    }
}
/* END Updated by 4Site on 2025-02-19 */