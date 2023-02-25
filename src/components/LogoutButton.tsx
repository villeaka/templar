type Props = {
  onLogout: () => void;
};

const LogoutButton = (props: Props) => <button onClick={props.onLogout}>Log out</button>;

export default LogoutButton;
