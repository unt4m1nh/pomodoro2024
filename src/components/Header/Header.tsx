import { faGear, faListCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header : React.FC = () => {
  return <>
        <h1>Focusly</h1>
        <div
            className='btn-setting'
            onClick={() => {
            } }
        >
            <p>Settings</p>
            <FontAwesomeIcon icon={faGear} size='xl' />
        </div>
        <div
            className='btn-task'
            onClick={() => {
            } }
        >
            <p>Task List</p>
            <FontAwesomeIcon icon={faListCheck} size='xl' />
        </div>
    </>;
};

export default Header;
