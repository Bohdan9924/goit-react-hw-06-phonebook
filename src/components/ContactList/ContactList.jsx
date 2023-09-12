import { useSelector, useDispatch } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { deleteContact } from 'redux/contactsSlice';
import css from 'components/ContactList/ContactList.module.css';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleDelete = id => dispatch(deleteContact(id));

  const filter = useSelector(getFilter);
  const normalizedFilter = filter.toLowerCase();
  const filteredContacts =
    contacts.length > 0
      ? contacts.filter(contact =>
          contact.name.toLowerCase().includes(normalizedFilter)
        )
      : contacts;
  

  return (
    <ul className={css.contactList}>
      {filteredContacts.map(({ id, name, number }) => {
        return (
          <li key={id}>
            <span>
              {name}: {number}
            </span>
            <button type="button" onClick={() => handleDelete(id)}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default ContactList;
