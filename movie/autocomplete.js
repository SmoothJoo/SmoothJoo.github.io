const createAutoComplete = ({
    root,
    renderOption,
    onOptionSelect,    
    inputValue,
    fetchData
}) => {
    root.innerHTML = `
    <div class="form-group">
        <label><strong>Search</strong></label>
        <input class="form-control" />
        <div class="btn-group">
            <div class="dropdown-menu results"></div>
        </div>
    </div>
    `;
    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown-menu');
    console.log(dropdown);
    const results = root.querySelector('.results');

    const onInput = async event =>{
        const items= await fetchData(event.target.value);

        if (items.length <=0){
            dropdown.classList.remove('show');
            return;
        }

        results.innerHTML = '';
            dropdown.classList.add('show');
        for (let item of items) {
            const option = document.createElement('a');
            option.classList.add('dropdown-item');
          option.innerHTML = renderOption(item);
          option.addEventListener('click', () => {
            dropdown.classList.remove('show');
            input.value = inputValue(item);
            onOptionSelect(item);
          });
          results.appendChild(option);
        }
    };
    input.addEventListener('input',debounce(onInput, 1000));
    
  document.addEventListener('click', event => {
    if (!root.contains(event.target)) {
      dropdown.classList.remove('show');
    }
  });
};
