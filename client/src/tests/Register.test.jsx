import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from '../components/Register';
import { AuthProvider } from '../security/AuthContext';

// Wrap component with BrowserRouter since Hero likely contains Links
const renderRegister = () => {
    return render(
<BrowserRouter>
      <AuthProvider>
        <Register />
      </AuthProvider>
    </BrowserRouter>

    );
  };

// Mock the useAuthUser hook
jest.mock('../security/AuthContext', () => ({
  useAuthUser: () => ({
    register: jest.fn()
  }),
  AuthProvider: ({ children }) => children
}));

describe('Register Component', () => {

    beforeEach(() => {
        renderRegister();
    });

  test('renders name input field (remember that the * is for required)', () => {
    
    const nameInput = screen.getByLabelText("Name *");
    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toHaveAttribute('type', 'text');
    expect(nameInput).toHaveAttribute('required');
  });

  test('renders username input field', () => {
    
    const usernameInput = screen.getByLabelText("Username *");
    expect(usernameInput).toBeInTheDocument();
    expect(usernameInput).toHaveAttribute('type', 'text');
    expect(usernameInput).toHaveAttribute('required');
  });

  test('renders password input field', () => {
    
    const passwordInput = screen.getByLabelText("Password *");
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(passwordInput).toHaveAttribute('required');
  });
});
