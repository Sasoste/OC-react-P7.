const dropdownTriggers = document.querySelectorAll('.dropdown');

dropdownTriggers.forEach(trigger => {
    trigger.addEventListener('click', (event) => {
        const dropdownContent = trigger.nextElementSibling;

        const isHidden = dropdownContent.classList.contains('hidden');

        dropdownContent.classList.toggle('hidden', !isHidden);
        trigger.parentElement.classList.toggle('rounded-b-none', isHidden);
        trigger.parentElement.classList.toggle('rounded-b-xl', !isHidden);
    });
});
