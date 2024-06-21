import { JwtService } from '@nestjs/jwt';

export const data = {
  id: '1',
  name: 'teste master',
  email: 'segunda4@uorak.com',
  iat: 1718931378,
  exp: 1719536178,
  aud: 'users',
  iss: 'gvlar',
  sub: '1',
};

export const JwtServiceRepositoryMock = {
  provide: JwtService,
  useValue: {
    sign: jest
      .fn()
      .mockReturnValue(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InRlc3RlIG1hc3RlciIsImVtYWlsIjoic2VndW5kYTRAdW9yYWsuY29tIiwiaWF0IjoxNzE4OTMwNTcwLCJleHAiOjE3MTk1MzUzNzAsImF1ZCI6InVzZXJzIiwiaXNzIjoiZ3ZsYXIiLCJzdWIiOiIxIn0.brLD5JMiDTgf6ISlTGUj5O8Mhk9W7o0aInvX0d9p1v4',
      ),
    verify: jest.fn().mockReturnValue(data),
  },
};
