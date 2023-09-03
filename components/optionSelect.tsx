// 입력하자마자 바로바로 dispatch 되는 필터링 옵션 선택창
import OptionSelectClub from './optionSelectClub';
import OptionSelectPos from './optionSelectPos';
import OptionSelectMinMax from './optionSelectMinMax';
import SearchBox from './searchBox';

const OptionSelect = () => {
  return (
    <>
      <SearchBox />
      <section className='mt-[48px] flex Wrapper1:w-[880px] Wrapper2:w-[710px] Wrapper3:w-[610px] w-[440px] p-4 flex-col justify-center items-end rounded-lg bg-white shadow-custom'>
        <div className='flex w-full justify-center items-start content-start flex-wrap gap-x-[128px] self-stretch'>
          {/* 문자열 옵션 선택 박스 */}

          <div className='flex w-option-container flex-col items-start space-y-6'>
            {/* 클럽 검색창 */}
            <OptionSelectClub />
            {/* 포지션 선택창 */}
            <OptionSelectPos />
          </div>
          {/* 숫자형 옵션 선택 박스 */}
          <div className='flex flex-col items-end w-[360px]'>
            {/* 옵션선택창 */}
            <OptionSelectMinMax />
          </div>
        </div>
      </section>
    </>
  );
};

export default OptionSelect;
