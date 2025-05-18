import { render, screen } from "@testing-library/react";
import ProfilePage from "@/app/profile/page";

// MOCK Clerk's useUser
jest.mock('@clerk/nextjs', () => ({
  useUser: () => ({
    user: { id: 'test-user-id', fullName: 'Test User' },
  }),
}));

jest.mock('../../convex/_generated/api', () => ({
  api: {
    plans: {
      getUserPlans: 'mock-getUserPlans',
    },
  },
}));
jest.mock('convex/react', () => ({
  useQuery: jest.fn(() => []), // mock your expected data here
}));

describe("ProfilePage", () => {
  it("renders correctly", () => {
    render(<ProfilePage />);
    const fitnessPlans = screen.getByRole('link', {
      name: /Create Your First Plan/i,
    });
    expect(fitnessPlans).toBeInTheDocument();
  })
})