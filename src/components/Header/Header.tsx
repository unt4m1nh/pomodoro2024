import { faGear, faListCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IHeaderProps {
    showTask: () => void;
}

const Header = ({ showTask } : IHeaderProps) => {
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
            onClick={showTask}
        >
            <p>Task List</p>
            <FontAwesomeIcon icon={faListCheck} size='xl' />
        </div>
    </>;
};

export default Header;
