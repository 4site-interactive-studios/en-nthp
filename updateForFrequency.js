function updateForFrequency(freq, askchanged) {

    callOutSelection(freq);
    //get ask value before change
    var frequency = freq;
    var currentSelectAmount;
    var crossReferenceValue = getUrlParameter('transaction.othamt1');
    var monthlyCharacter = "R";
    var referenceForMonthly = ($("input[name='transaction.othamt1']").val().length > 0) ? $("input[name='transaction.othamt1']").val() : getUrlParameter('transaction.othamt1');
    var monthlyCrossReferenceValue = referenceForMonthly.substring(0, 6) + monthlyCharacter + referenceForMonthly.substring(7);

    $('.en__field--donationAmt input[type="radio"]').each(function() {
        if (($(this).is(':checked'))) {
            if ($(this).val() !== 'Other') {
                currentSelectAmount = $(this).val();
            } else {
                currentSelectAmount = $('.en__field__input--other').val();
            }
        }
    });

    if (frequency == "monthly") {
        //update hidden field
        $('input[name="transaction.recurrpay"]').val('Y');
        $('input[name="transaction.recurrfreq"]').val('MONTHLY');
        $("input[name='transaction.othamt1']").val(monthlyCrossReferenceValue);
    } else if (frequency == "one-time") {
        //update hidden field
        $('input[name="transaction.recurrpay"]').val('');
        $('input[name="transaction.recurrfreq"]').val('');
        $("input[name='transaction.othamt1']").val(crossReferenceValue);
    }

    if (askchanged) {
        setTimeout(function() {
            var found = false;
            $('.en__field--donationAmt input[type="radio"]').each(function() {
                $(this).prop('checked', false);
                if ($(this).val() == currentSelectAmount) {
                    $(this).prop('checked', true);
                    $('.en__field__input--other').removeClass('hasvalue');
                    found = true;
                }
            });
            if (!found) {
                $('.en__field--donationAmt input[value="Other"]').prop('checked', true);
                $('.en__field__input--other').val(currentSelectAmount).addClass('hasvalue');
            }
        }, 0);
    }
}