       const screen = document.getElementById('screen');
        let lastResult = null;
        
        function display(value) {
            if (screen.value === '0' || screen.value === 'Error' || screen.value === 'NaN') {
                screen.value = value;
            } else {
                screen.value += value;
            }
        }
        
        function C() {
            screen.value = '0';
            lastResult = null;
        }
        
        function del() {
            if (screen.value.length === 1 || screen.value === 'Error' || screen.value === 'NaN') {
                screen.value = '0';
            } else {
                screen.value = screen.value.slice(0, -1);
                if (screen.value === '') screen.value = '0';
            }
        }
        
        function factorial(n) {
            if (n === 0 || n === 1) return 1;
            return n * factorial(n - 1);
        }
        
        function calculate() {
            try {
                let expression = screen.value;
                
                // Replace special symbols
                expression = expression.replace(/÷/g, '/').replace(/×/g, '*');
                
                // Handle percentage
                expression = expression.replace(/(\d+)%/g, '($1/100)');
                
                // Handle factorial
                expression = expression.replace(/(\d+)!/g, (match, n) => factorial(parseInt(n)));
                
                // Evaluate the expression
                const result = eval(expression);
                
                // Display the result
                screen.value = result;
                lastResult = result;
            } catch (error) {
                screen.value = 'Error';
            }
        }
        
        // Keyboard support
        document.addEventListener('keydown', function(event) {
            const key = event.key;
            
            if (/[0-9]/.test(key)) {
                display(key);
            } else if (key === '+' || key === '-' || key === '*' || key === '/') {
                display(key);
            } else if (key === '(' || key === ')') {
                display(key);
            } else if (key === '.') {
                display('.');
            } else if (key === 'Enter') {
                calculate();
            } else if (key === 'Escape') {
                C();
            } else if (key === 'Backspace') {
                del();
            } else if (key === '%') {
                display('%');
            }
        });