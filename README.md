# ТЗ: Список сотрудников и их паспортов

Список хранится в localStorage на ключе ”empStore".

  Структура данных по сотруднику Emp: {  
  &ensp; fio, // полностью  
  &ensp; pass_ser, // 4 цифры  
  &ensp; pass_no, // 6 цифр  
  &ensp; pass_dt, // формат RFC (YYYY-MM-DDThh:mm:ss...)  
  }

### Визуально:
- слева: список в формате "Фамилия Инициалы"
- справа: форма с 4мя полями записи Сотрудника

### Вверху списка сотрудников:
- Кнопка "Добавить" - открывает чистую форму Сотрудника.
- Клик на Сотруднике - открывает форму Сотрудника.

### В форме:
- Кнопка "Сохранить" появляется при изменении любого поля.
  При нажатии на неё происходит сохранение в localStorage.
- Кнопка "Удалить" - удаляет текущего выбранного Сотрудника.

##NPM-пакеты:
* vue 2.7
* vueuse
* vuetify // библиотека UI-элементов
* lodash
* dayjs

##Форматирование кода
- JS & Vue Style Guides
- Отступы: Табуляция
- Размер отступа: 2
- Без точек с запятой в конце строк
- Двойные кавычки для строковых констант
  Это формат кода нашего основного проекта.