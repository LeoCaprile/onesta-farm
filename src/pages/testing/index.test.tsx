import React from 'react';
import TestingPage, { getServerSideProps } from '.';
import { render, screen } from '@testing-library/react';

describe('Testing the testing page', () => {
  const MoocText = 'Hello World!';

  it('has to return the correct text "HelloWorld!"', async () => {
    // Arrange

    const response = await getServerSideProps();
    const expectedResponse = { props: { text: MoocText } };
    //Act
    // * Nothing because this is a test example
    //Assert
    expect(response).toEqual(expectedResponse);
  });

  it('has to render the component and have a header', () => {
    //Arrange
    render(<TestingPage text={MoocText} />);
    const headerText = screen.getByRole('heading', { level: 1 }).textContent;
    //Assert
    expect(headerText).toBe('Testing on this template!');
  });

  it('has to have props are rendered', () => {
    //Arrange
    render(<TestingPage text={MoocText} />);
    const moocTextRendered = screen.getByRole('note').textContent;
    //Assert
    expect(moocTextRendered).toBe('(' + MoocText + ')');
  });
});
