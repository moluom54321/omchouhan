// Admission Form Handler
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('admissionForm');

    if (!form) {
        console.error('admissionForm not found on this page');
        return;
    }

    // Pre-select course from URL if present
    const urlParams = new URLSearchParams(window.location.search);
    const courseParam = urlParams.get('course');
    if (courseParam) {
        const courseMap = {
            'piano': 'Piano',
            'guitar': 'Guitar',
            'vocal': 'Vocal Music'
        };
        const val = courseMap[courseParam.toLowerCase()];
        if (val) {
            const checkboxes = document.querySelectorAll('input[name="selectedCourse"]');
            checkboxes.forEach(cb => {
                if (cb.value.toLowerCase().includes(val.toLowerCase())) {
                    cb.checked = true;
                }
            });
        }
    }

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        e.stopPropagation();

        console.log('--- Form submit triggered ---');

        // Collect all form values directly
        const fullName = document.getElementById('fullName')?.value?.trim();
        const email = document.getElementById('email')?.value?.trim();
        const password = document.getElementById('password')?.value?.trim();
        const phone = document.getElementById('phone')?.value?.trim();
        const dateOfBirth = document.getElementById('dateOfBirth')?.value?.trim();
        const gender = document.getElementById('gender')?.value?.trim();
        const street = document.getElementById('street')?.value?.trim();
        const city = document.getElementById('city')?.value?.trim();
        const state = document.getElementById('state')?.value?.trim();
        const pincode = document.getElementById('pincode')?.value?.trim();
        const guardianName = document.getElementById('guardianName')?.value?.trim();
        const guardianPhone = document.getElementById('guardianPhone')?.value?.trim();
        const termsChecked = document.getElementById('terms')?.checked;

        // Collect selected courses (checkboxes)
        const selectedCourses = Array.from(
            document.querySelectorAll('input[name="selectedCourse"]:checked')
        ).map(cb => cb.value);

        // Collect selected schedules (checkboxes or radio)
        const selectedSchedules = Array.from(
            document.querySelectorAll('input[name="preferredSchedule"]:checked')
        ).map(cb => cb.value);

        console.log('Courses selected:', selectedCourses);
        console.log('Schedules selected:', selectedSchedules);

        // Validate required fields
        if (!fullName) { alert('Please enter your Full Name.'); return; }
        if (!email) { alert('Please enter your Email.'); return; }
        if (!password || password.length < 6) { alert('Password must be at least 6 characters.'); return; }
        if (!phone || !/^\d{10}$/.test(phone)) { alert('Phone number must be exactly 10 digits.'); return; }
        if (!dateOfBirth) { alert('Please enter your Date of Birth.'); return; }
        if (!street || !city || !state) { alert('Please fill in your complete address.'); return; }
        if (!pincode || !/^\d{6}$/.test(pincode)) { alert('Pincode must be exactly 6 digits.'); return; }
        if (selectedCourses.length === 0) { alert('Please select at least one course.'); return; }
        if (selectedSchedules.length === 0) { alert('Please select at least one schedule slot.'); return; }
        if (!guardianName || !guardianPhone) { alert('Please enter Parent/Guardian Name and Phone.'); return; }
        if (!termsChecked) { alert('Please agree to the Terms and Conditions.'); return; }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;

        // Build payload
        const admissionData = {
            fullName,
            email,
            password,
            phone,
            dateOfBirth,
            gender,
            address: { street, city, state, pincode },
            course: selectedCourses,
            preferredSchedule: selectedSchedules,
            guardianDetails: { name: guardianName, phone: guardianPhone },
            admissionStatus: 'approved',
            paymentStatus: 'paid',
            enrollmentStatus: 'enrolled',
            joinedDate: new Date().toISOString()
        };

        console.log('Sending admission data:', admissionData);

        // Determine API endpoint
        let apiEndpoint = 'http://localhost:5000/api/admission';
        if (window.CONFIG && window.CONFIG.API_BASE_URL) {
            apiEndpoint = window.CONFIG.API_BASE_URL + '/admission';
        }

        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(admissionData)
            });

            console.log('API Response status:', response.status);
            const result = await response.json();
            console.log('API Response body:', result);

            if (response.status === 201 || (response.ok && result.success)) {
                // SUCCESS — show popup
                console.log('SUCCESS! Showing popup...');
                const popup = document.getElementById('popup');
                if (popup) {
                    popup.style.display = 'flex';
                    popup.style.zIndex = '99999';
                } else {
                    alert('🎉 Thank you for enrolling in our school! Please login with your email and password.');
                }

                // Reset form after short delay
                setTimeout(() => form.reset(), 500);

                // Redirect to student login after 5 seconds
                setTimeout(() => {
                    window.location.href = 'student-login.html';
                }, 5000);

            } else {
                // Server returned an error
                const msg = result.message || result.error || 'Please try again.';
                alert('Submission Error: ' + msg);
                console.error('Submission error from server:', result);
            }

        } catch (err) {
            console.error('Network error:', err);
            alert('Network error! Please make sure the server is running.\n\nError: ' + err.message);
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
});