
      
        // Disable right-click context menu
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            showWarning('Acess Denied.');
        });
        
        // Disable specific keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Disable Ctrl+U (View Source)
            if (e.ctrlKey && e.key === 'u') {
                e.preventDefault();
                showWarning('Access Denied, stop trying.');
                return false;
            }
            
            // Disable F12 (Developer Tools)
            if (e.key === 'F12') {
                e.preventDefault();
                showWarning('Access Denied.');
                return false;
            }
            
            // Disable Ctrl+Shift+I (Developer Tools)
            if (e.ctrlKey && e.shiftKey && e.key === 'I') {
                e.preventDefault();
                showWarning('Access Denied.');
                return false;
            }
            
            // Disable Ctrl+Shift+C (Inspect Element)
            if (e.ctrlKey && e.shiftKey && e.key === 'C') {
                e.preventDefault();
                showWarning('Access Denied.');
                return false;
            }
            
            // Disable Ctrl+Shift+J (JavaScript Console)
            if (e.ctrlKey && e.shiftKey && e.key === 'J') {
                e.preventDefault();
                showWarning('JavaScript console is disabled.');
                return false;
            }
        });
        
        // Attempt to detect developer tools opening
        let devToolsOpen = false;
        
        setInterval(function() {
            const widthThreshold = window.outerWidth - window.innerWidth > 160;
            const heightThreshold = window.outerHeight - window.innerHeight > 160;
            
            if (!devToolsOpen && (widthThreshold || heightThreshold)) {
                devToolsOpen = true;
                showWarning('Developer tools detection triggered. Please close developer tools to continue.');
            }
        }, 1000);
        
        // Show warning message
        function showWarning(message) {
            // Remove existing warning if present
            const existingWarning = document.getElementById('protection-warning');
            if (existingWarning) {
                existingWarning.remove();
            }
            
            // Create warning element
            const warning = document.createElement('div');
            warning.id = 'protection-warning';
            warning.style.position = 'fixed';
            warning.style.top = '20px';
            warning.style.left = '50%';
            warning.style.transform = 'translateX(-50%)';
            warning.style.backgroundColor = '#ff4757';
            warning.style.color = 'white';
            warning.style.padding = '15px 20px';
            warning.style.borderRadius = '5px';
            warning.style.zIndex = '10000';
            warning.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
            warning.style.maxWidth = '80%';
            warning.style.textAlign = 'center';
            warning.style.fontWeight = 'bold';
            warning.textContent = message;
            
            document.body.appendChild(warning);
            
            // Remove warning after 3 seconds
            setTimeout(function() {
                if (document.body.contains(warning)) {
                    warning.style.opacity = '0';
                    warning.style.transition = 'opacity 0.5s ease';
                    setTimeout(() => warning.remove(), 500);
                }
            }, 3000);
        }
        
        // Additional protection: disable text selection
        document.addEventListener('selectstart', function(e) {
            e.preventDefault();
        });
        
        // Disable dragging of images
        document.addEventListener('dragstart', function(e) {
            if (e.target.tagName === 'IMG') {
                e.preventDefault();
            }
        });