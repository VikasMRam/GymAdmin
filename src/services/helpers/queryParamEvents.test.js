import { addEventToQueryString, addEventToUrl, extractEventFromQuery } from './queryParamEvents';

describe('Given the queryParamEvents helper functions', () => {
  describe('when extracting an event from a query string that does not contain a `sly_action`', () => {
    it('should return null with the original query string', () => {
      const queryString = '?hello=world&please=true&maintain=order';
      const { event, search } = extractEventFromQuery(queryString);

      expect(event).toBeNull();
      expect(search).toBe(queryString);
    });
  });

  describe('when extracting an event from a query string contains only a `sly_action`', () => {
    it('should return an event with only an action and the parameter removed from the query string', () => {
      const queryString = '?hello=world&please=true&maintain=order&sly_action=link_clicked';
      const { event, search } = extractEventFromQuery(queryString);

      expect(event).toEqual({ action: 'link_clicked' });
      expect(search).toBe('?hello=world&please=true&maintain=order');
    });
  });

  describe('when extracting a full event from a query string', () => {
    it('should return the entire event event and remove the params from the query string', () => {
      const queryString = '?hello=world&please=true&maintain=order&sly_action=link_clicked&sly_category=category-foo&sly_label=liability&sly_value=frank&sly_ni=true';
      const { event, search } = extractEventFromQuery(queryString);

      expect(event).toEqual({
        action: 'link_clicked',
        category: 'category-foo',
        label: 'liability',
        value: 'frank',
        nonInteraction: true,
      });
      expect(search).toBe('?hello=world&please=true&maintain=order');
    });
  });

  describe('when extracting a full event from a query string', () => {
    it('should parse value as a number if it has one and nonInteractive as false if false', () => {
      const queryString = '?hello=world&please=true&maintain=order&sly_action=link_clicked&sly_value=123&sly_ni=false';
      const { event, search } = extractEventFromQuery(queryString);

      expect(event).toEqual({ action: 'link_clicked', value: 123, nonInteraction: false });
      expect(search).toBe('?hello=world&please=true&maintain=order');
    });
  });

  describe('when serializing an empty event into an empty query string', () => {
    it('should return an empty string', () => {
      expect(addEventToQueryString('', {})).toBe('');
    });
  });

  describe('when serializing a full event into an empty query string', () => {
    it('should return a query string with just the event', () => {
      const event = { action: 'add', category: 'maths', label: 'simple', value: 3, nonInteraction: true };

      const result = addEventToQueryString('', event);

      expect(result).toBe('?sly_action=add&sly_category=maths&sly_label=simple&sly_value=3&sly_ni=true');
    });
  });

  describe('when serializing an event onto a non-empty query string', () => {
    it('should return a query string with the event params appended', () => {
      const event = { action: 'add', category: 'maths', label: 'simple' };

      const search = '?hello=world&please=true&maintain=order';
      const result = addEventToQueryString(search, event);

      expect(result).toBe(`${search}&sly_action=add&sly_category=maths&sly_label=simple`);
    });
  });

  describe('when serializing an event onto a path with search params', () => {
    it('should return the path with the event params appended to the existing params', () => {
      const event = { action: 'add', category: 'maths', label: 'simple' };
      event;
      const path = '/search/page?hello=world&please=true&maintain=order';
      const result = addEventToUrl(path, event);

      expect(result).toBe(`${path}&sly_action=add&sly_category=maths&sly_label=simple`);
    });
  });

  describe('when serializing an event onto a path with no search params', () => {
    it('should return the path with the event params as the query string', () => {
      const event = { action: 'add', category: 'maths', label: 'simple' };

      const path = '/search/page';
      const result = addEventToUrl(path, event);

      expect(result).toBe(`${path}?sly_action=add&sly_category=maths&sly_label=simple`);
    });
  });

  describe('when serializing an event onto a url', () => {
    it('should return the url with the event params appended', () => {
      const event = { action: 'add', category: 'maths', label: 'simple' };

      const url = 'https://seniorly.com/search/page?foobar=true';
      const result = addEventToUrl(url, event);

      expect(result).toBe(`${url}&sly_action=add&sly_category=maths&sly_label=simple`);
    });
  });

  describe('when an event is added and then removed from the query string', () => {
    it('should result in the same query string as the original', () => {
      const event = { action: 'add', category: 'maths', label: 'simple' };
      const search = '?hello=world&please=true&maintain=order';

      const searchWithEvent = addEventToQueryString(search, event);

      expect(extractEventFromQuery(searchWithEvent)).toEqual({ event, search });
    });
  });

  describe('when an event that looks like a query string is added', () => {
    it('should encode and decode the values', () => {
      const event = { action: 'add', category: 'query=frozen&which=2', label: 'simple' };
      const search = '?hello=world&please=true&maintain=order';

      const searchWithEvent = addEventToQueryString(search, event);

      expect(extractEventFromQuery(searchWithEvent)).toEqual({ event, search });
    });
  });
});
