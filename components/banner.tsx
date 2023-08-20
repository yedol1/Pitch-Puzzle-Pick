import Image from 'next/image';

const Banner = () => {
  return (
    <section className='inline-flex items-start gap-18 mt-34 text-white justify-center'>
      <Image src='/logo.svg' width={218} height={218} alt='로고 이미지' />
      <div className='hidden customNav:flex py-3 flex-col items-start gap-6.5'>
        <h1 className='h-28.5 text-48 font-medium leading-125'>
          Pitch Puzzle Pick
          <br />
          Who am I ?
        </h1>
        <p className='w-127.5 h-13.5 text-base font-medium'>
          {'FootballManager 게임의 선수 중, 자신이 원하는 선수를 찾아내는 것이 '}
          <br />
          {'마치, 퍼즐을 풀어나가는 것처럼 즐거운 경험이 되었으면 좋겠습니다. :)'}
        </p>
      </div>
    </section>
  );
};

export default Banner;
