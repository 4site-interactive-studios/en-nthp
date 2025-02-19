function updateForFrequency(freq, askchanged) {
    // Validate frequency parameter is either 'monthly' or 'one-time'
    if (typeof freq !== 'string' || !['monthly', 'one-time'].includes(freq)) {
        console.error('Invalid frequency value');
        return;
    }

    callOutSelection(freq);

    // Store current donation amount and reference values
    var currentSelectAmount;
    var crossReferenceValue = getUrlParameter('transaction.othamt1') || $("input[name='transaction.othamt1']").val();
    var monthlyCharacter = "R";
    var referenceForMonthly = ($("input[name='transaction.othamt1']").val() || getUrlParameter('transaction.othamt1'));
    var monthlyCrossReferenceValue = referenceForMonthly.substring(0, 6) + monthlyCharacter + referenceForMonthly.substring(7);

    // Determine currently selected donation amount from radio buttons or 'Other' input
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
        $("input[name='transaction.othamt1']").val(crossReferenceValue);
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