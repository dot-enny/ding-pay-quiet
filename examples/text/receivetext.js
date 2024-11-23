var TextReceiver = (function () {
    Quiet.init({
        profilesPrefix: "./",
        memoryInitializerPrefix: "./",
        libfecPrefix: "./"
    });
    var target;
    var content = new ArrayBuffer(0);
    var warningbox;


    function onReceive(recvPayload) {
        // content = Quiet.mergeab(content, recvPayload);
        var currentBalance = parseFloat(target.textContent.replace('$', '')); // Parse the balance as a number
        var receivedAmount = parseFloat(Quiet.ab2str(recvPayload)); // Convert to number

        if (isNaN(receivedAmount)) {
            console.error("Received payload is not a valid number.");
            return;
        }

        if (document.querySelector('[data-quiet-sending-text]').innerText === "Sending...") {
            return;
        }

        // Add the received amount to the balance
        currentBalance += receivedAmount;

        // Update the target's text content with the new balance
        target.textContent = `$${currentBalance.toFixed(2)}`;

        // Log the transaction history
        var history = document.querySelector('[data-quiet-transaction-history]');
        var entry = document.createElement('li');
        entry.textContent = `Received $${receivedAmount}`;
        history.appendChild(entry);

        warningbox.classList.add("hidden");
    };

    function onReceiverCreateFail(reason) {
        console.log("failed to create quiet receiver: " + reason);
        warningbox.classList.remove("hidden");
        // warningbox.textContent = "Sorry, it looks like this example is not supported by your browser. Please give permission to use the microphone or try again in Google Chrome or Microsoft Edge."
        warningbox.textContent = "Sorry, give permission to use mic "
    };

    function onReceiveFail(num_fails) {
        warningbox.classList.remove("hidden");
        warningbox.textContent = "We didn't quite get that. It looks like you tried to transmit something. You may need to move the transmitter closer to the receiver and set the volume to 50%."
    };

    function onQuietReady() {
        var profilename = document.querySelector('[data-quiet-profile-name]').getAttribute('data-quiet-profile-name');
        if (document.querySelector('[data-quiet-sending-text]').innerText === "Sending...") {
            Quiet.receiver({
                profile: profilename,
                onReceive: onReceive,
                onCreateFail: onReceiverCreateFail,
                onReceiveFail: onReceiveFail
            });
            return;
        }
        Quiet.receiver({
            profile: profilename,
            onReceive: onReceive,
            onCreateFail: onReceiverCreateFail,
            onReceiveFail: onReceiveFail
        });
    };

    function onQuietFail(reason) {
        console.log("quiet failed to initialize: " + reason);
        warningbox.classList.remove("hidden");
        warningbox.textContent = "Sorry, it looks like there was a problem with this example (" + reason + ")";
    };

    function onDOMLoad() {
        target = document.querySelector('[data-quiet-receive-text-target]');
        warningbox = document.querySelector('[data-quiet-warning]');
        Quiet.addReadyCallback(onQuietReady, onQuietFail);
    };

    document.addEventListener("DOMContentLoaded", onDOMLoad);
})();
