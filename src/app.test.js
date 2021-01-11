import App from './App';
import React from "react";
import { mount } from 'enzyme';
import moment from 'moment-timezone';
import getDeadlineDate from './utility/getDeadlineDate';

describe('testing the rendering of application nodes', () => {
  let
    component,
    textarea,
    radioButton;
  beforeEach(() => {
    component = mount(<App />);
    textarea = component.find('textarea');
    radioButton = component.find('input[id="eng"]');
  });
  it('should contain app', () => {
    const wrapper = component.find('.App');
    expect(wrapper.length).toBe(1);
  });
  it('should be calculate quantity symbols', () => {
    textarea.simulate('change', { target: { value: 'test' } });
    expect(component.find('.quantity_symbols').text()).toBe('4')
  });
  it('should be calculate total price', () => {
    textarea.simulate('change', { target: { value: 'test' } });
    radioButton.simulate('click');
    expect(component.find('.total_price').text()).toBe(' 120 грн');
  });
  it('function should return the correct date', () => {
    const fakeDate = new Date(Date.parse('Fri, 30 Oct 2020 12:00:00 +0200'));
    expect(moment.tz(getDeadlineDate(fakeDate, 12), 'Europe/Kiev').format('Термін виконання: DD.MM.YY o H:mm')).toBe('Термін виконання: 02.11.20 o 15:00')
  });
  it('should contain the correct deadline', () => {
    textarea.simulate('change', { target: { value: 'test' } });
    radioButton.simulate('click');
    expect(component.find('.deadline').text()).toBe(moment.tz(getDeadlineDate(moment(), 1), 'Europe/Kiev').format('Термін виконання: DD.MM.YY o H:mm'))
  });
});
//testing business logic of the app
test.each`
    startTime                      | durationHours | expectedResult
  ${'30/10/2020, 12:00 Friday'}    | ${12}         | ${'02/11/2020, 15:00 Monday'}
  ${'23/09/2019, 10:00 Monday'}    | ${5}          | ${'23/09/2019, 15:00 Monday'}
  ${'23/09/2019, 18:00 Monday'}    | ${7}          | ${'24/09/2019, 16:00 Tuesday'}
  ${'23/09/2019, 18:00 Monday'}    | ${25}         | ${'26/09/2019, 16:00 Thursday'}
  ${'21/09/2019, 15:00 Saturday'}  | ${7}          | ${'23/09/2019, 17:00 Monday'}
  ${'20/09/2019, 17:00 Friday'}    | ${60}         | ${'01/10/2019, 14:00 Tuesday'}
  ${'21/09/2019, 17:00 Saturday'}  | ${60}         | ${'01/10/2019, 16:00 Tuesday'}
  ${'24/09/2019, 08:00 Tuesday'}   | ${8}          | ${'24/09/2019, 18:00 Tuesday'}
  ${'25/09/2019, 08:00 Wednesday'} | ${8}          | ${'25/09/2019, 18:00 Wednesday'}
  ${'25/09/2019, 18:00 Wednesday'} | ${8}          | ${'26/09/2019, 17:00 Thursday'}
  ${'25/09/2019, 19:00 Wednesday'} | ${8}          | ${'26/09/2019, 18:00 Thursday'}
  ${'25/09/2019, 18:45 Wednesday'} | ${8}          | ${'26/09/2019, 17:45 Thursday'}
  ${'25/09/2019, 19:10 Wednesday'} | ${8}          | ${'26/09/2019, 18:00 Thursday'}
  ${'27/09/2019, 17:00 Friday'}    | ${8}          | ${'30/09/2019, 16:00 Monday'}
  ${'27/09/2019, 19:00 Friday'}    | ${8}          | ${'30/09/2019, 18:00 Monday'}
  ${'28/09/2019, 10:00 Saturday'}  | ${8}          | ${'30/09/2019, 18:00 Monday'}
`('returns $expected when $startTime', ({startTime, durationHours, expectedResult}) => {
  expect(getDeadlineDate(startTime,durationHours).format('DD/MM/YYYY, H:mm dddd')).toBe(expectedResult);
});

