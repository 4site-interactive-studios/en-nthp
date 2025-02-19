function updateForFrequency(freq, askchanged) {
    // Input validation
    if (typeof freq !== 'string' || !['monthly', 'one-time'].includes(freq)) {
        console.error('Invalid frequency value');
        return;
    }

    callOutSelection(freq);

    // Get current donation amount before changes
    var currentSelectAmount;
    var crossReferenceValue = getUrlParameter('transaction.othamt1') || $("input[name='transaction.othamt1']").val();
    var monthlyCharacter = "R";
    var referenceForMonthly = ($("input[name='transaction.othamt1']").val() || getUrlParameter('transaction.othamt1'));
    var monthlyCrossReferenceValue = referenceForMonthly.substring(0, 6) + monthlyCharacter + referenceForMonthly.substring(7);

    // Find selected donation amount
    $('.en__field--donationAmt input[type="radio"]').each(function() {
        if ($(this).is(':checked')) {
            currentSelectAmount = $(this).val() !== 'Other' 
                ? $(this).val()
                : $('.en__field__input--other').val();
        }
    });

    // Update recurring payment fields based on frequency
    if (freq === "monthly") {
        $('input[name="transaction.recurrpay"]').val('Y');
        $('input[name="transaction.recurrfreq"]').val('MONTHLY');
        $("input[name='transaction.othamt1']").val(monthlyCrossReferenceValue);
    } else if (freq === "one-time") {
        $('input[name="transaction.recurrpay"]').val('');
        $('input[name="transaction.recurrfreq"]').val('');
        $("input[name='transaction.othamt1']").val(crossReferenceValue);
    }

    // Update donation amount selection if needed
    if (askchanged) {
        setTimeout(function() {
            var found = false;
            
            $('.en__field--donationAmt input[type="radio"]').each(function() {
                $(this).prop('checked', false);
                if ($(this).val() === currentSelectAmount) {
                    $(this).prop('checked', true);
                    $('.en__field__input--other').removeClass('hasvalue');
                    found = true;
                }
            });

            if (!found) {
                $('.en__field--donationAmt input[value="Other"]').prop('checked', true);
                $('.en__field__input--other')
                    .val(currentSelectAmount)
                    .addClass('hasvalue');
            }
        }, 0);
    }
}