import './index.css'

window.addEventListener('DOMContentLoaded', () => {
  const valuesContainer = document.getElementById('values-container')
  const valueNameInput = document.getElementById(
    'value-name'
  ) as HTMLInputElement
  const valueNumberInput = document.getElementById(
    'value-number'
  ) as HTMLInputElement
  const updateButton = document.getElementById('update-button')

  const values: { [key: string]: number } = {
    Strength: 100,
    Intelligence: 200,
    Charm: 300,
    Morality: 150,
    Faith: 250,
    Sin: 50,
    CombatSkill: 180,
    Cooking: 220,
    Cleaning: 130,
  }

  function renderValues() {
    valuesContainer.innerHTML = ''
    for (const [name, value] of Object.entries(values)) {
      const valueElement = document.createElement('div')
      valueElement.className = 'value-container'
      valueElement.innerHTML = `
        <strong>${name}</strong>
        <div class="progress-bar">
          <div class="progress" style="width: ${value / 10}%"></div>
        </div>
        <span>${value}</span>
        <button class="increase-button" data-name="${name}">Increase</button>
        <button class="decrease-button" data-name="${name}">Decrease</button>
      `
      valuesContainer.appendChild(valueElement)
    }
  }

  valuesContainer?.addEventListener('click', (event) => {
    const target = event.target as HTMLElement
    if (target.classList.contains('increase-button')) {
      const name = target.getAttribute('data-name')
      if (name && values[name] < 999) {
        values[name] += 1
        renderValues()
      }
    } else if (target.classList.contains('decrease-button')) {
      const name = target.getAttribute('data-name')
      if (name && values[name] > 0) {
        values[name] -= 1
        renderValues()
      }
    }
  })

  updateButton?.addEventListener('click', () => {
    const name = valueNameInput.value
    const number = parseInt(valueNumberInput.value, 10)
    if (name in values && !isNaN(number) && number >= 0 && number <= 999) {
      values[name] = number
      renderValues()
    }
  })

  renderValues()
})

document.getElementById('switch')?.addEventListener('click', () => {
  window.electronAPI.switchMain()
})
