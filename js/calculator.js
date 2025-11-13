document.addEventListener("DOMContentLoaded", function() {
    let currentStep = 1;
    const steps = document.querySelectorAll(".step");
    const stepperItems = document.querySelectorAll(".stepper-item");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    const stepCounterDisplay = document.getElementById("step-counter-display");

    function showStep(stepNumber) {
        steps.forEach(step => step.classList.add("d-none"));
        document.getElementById(`step-${stepNumber}`).classList.remove("d-none");

        // Update stepper
        stepperItems.forEach((item, index) => {
            if (index < stepNumber - 1) {
                item.classList.add("completed");
                item.classList.remove("active");
            } else if (index === stepNumber - 1) {
                item.classList.add("active");
                item.classList.remove("completed");
            } else {
                item.classList.remove("active", "completed");
            }
        });
        
        // Update header step count display
        if (stepCounterDisplay) {
            stepCounterDisplay.textContent = `${stepNumber}/${steps.length}`;
        }
        
        // Update button visibility and text
        prevBtn.style.visibility = (stepNumber === 1) ? "hidden" : "visible";
        nextBtn.textContent = (stepNumber === steps.length) ? "GET QUOTE" : "NEXT";
    }
    
    function nextStep() {
        if (currentStep < steps.length) {
            currentStep++;
            showStep(currentStep);
        } else {
            document.getElementById("contact-form").requestSubmit();
            alert("Form Submitted!");
        }
    }

    function prevStep() {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
        }
    }
    
    nextBtn.addEventListener("click", nextStep);
    prevBtn.addEventListener("click", prevStep);
    
    showStep(currentStep);

    // Logic for Step 1: BHK type collapse
    const collapseElements = document.querySelectorAll('.bhk-option-item .collapse');
    collapseElements.forEach(collapseEl => {
        const label = collapseEl.previousElementSibling;
        const icon = label.querySelector('i');

        collapseEl.addEventListener('show.bs.collapse', () => {
            if(icon) icon.classList.replace('bi-chevron-down', 'bi-chevron-up');
            const parentRadio = collapseEl.parentElement.querySelector('input[type="radio"]');
            if (parentRadio) parentRadio.checked = true;
        });
         collapseEl.addEventListener('hide.bs.collapse', () => {
            if(icon) icon.classList.replace('bi-chevron-up', 'bi-chevron-down');
        });
    });

    document.querySelectorAll('input[name="bhk_type"]').forEach(radio => {
        radio.addEventListener('change', function() {
            if (!this.hasAttribute('data-bs-target')) {
                 collapseElements.forEach(collapseEl => {
                    const bsCollapse = new bootstrap.Collapse(collapseEl, { toggle: false });
                    bsCollapse.hide();
                 });
            }
            document.querySelectorAll('input[name="bhk_size"]').forEach(sizeRadio => {
                if (!this.parentElement.contains(sizeRadio)) {
                    sizeRadio.checked = false;
                }
            });
        });
    });

    // Logic for Step 2: Room quantity selectors
    document.querySelectorAll(".quantity-selector").forEach(selector => {
        const minusBtn = selector.querySelector(".minus");
        const plusBtn = selector.querySelector(".plus");
        const countSpan = selector.querySelector(".quantity-count");
        
        minusBtn.addEventListener("click", () => {
            let count = parseInt(countSpan.textContent);
            if (count > 0) { 
                countSpan.textContent = --count;
            }
        });
        plusBtn.addEventListener("click", () => {
            let count = parseInt(countSpan.textContent);
            countSpan.textContent = ++count;
        });
    });
});