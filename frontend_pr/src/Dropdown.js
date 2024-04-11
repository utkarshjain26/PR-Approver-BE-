import { Dropdown } from 'react-bootstrap';

const MyDropdown = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Select Approvers
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="Checkme1" />
            <label className="form-check-label" htmlFor="Checkme1">
              Check me
            </label>
          </div>
        </Dropdown.Item>

        <Dropdown.Item>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="Checkme2" />
            <label className="form-check-label" htmlFor="Checkme2">
              Check me
            </label>
          </div>
        </Dropdown.Item>

        <Dropdown.Item>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="Checkme3" />
            <label className="form-check-label" htmlFor="Checkme3">
              Check me
            </label>
          </div>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default MyDropdown;
