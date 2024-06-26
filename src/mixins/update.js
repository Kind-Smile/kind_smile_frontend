export default {
    data() {
        return {
            // refresh variables
            refreshing: false,
            registration: null,
            updateExists: false,
        }
    },
    created() {
        document.addEventListener('swUpdated', this.updateAvailable, { once: true });
        // Prevent multiple refreshes
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (this.refreshing) return;
            this.refreshing = true;
            // Here the actual reload of the page occurs
            window.location.reload();
        });
    },
    methods: {
        updateAvailable(event) {
            console.log(event)
            this.registration = event.detail
            this.updateExists = true
        },
        refreshApp() {
            this.updateExists = false
            // Make sure we only send a 'skip waiting' message if the SW is waiting
            if (!this.registration || !this.registration.waiting) return
            // Send message to SW to skip the waiting and activate the new SW
            this.registration.waiting.postMessage({ type: 'SKIP_WAITING' })
        }
    }
}
