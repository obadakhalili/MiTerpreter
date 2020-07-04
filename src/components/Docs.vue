<template>
  <div id="preview">
      <h1 class="code-line" data-line-start="0" data-line-end="1"><a id="Docs_0"></a>Docs</h1>
      <p class="has-line-data" data-line-start="2" data-line-end="4">
          The documentation explains the exceptions that this interpreter has.<br />
          There are also a few things you need to know before getting started. You will find them after the exceptions.
      </p>
      <h2 class="code-line" data-line-start="5" data-line-end="6"><a id="Data_Initializers_5"></a>Data Initializers</h2>
      <p class="has-line-data" data-line-start="6" data-line-end="7">
          MIPS has something called data initializers. It allows you to initialize data inside memory to use from inside your MIPS code. Here, you don’t have any instructions for initializing data. Or even any instruction outside the scope of
          the normal instruction formats. However, if you need to upload data to memory and/or registers, you can use the UI provided in this application to upload data into different 1024 (max) memory locations.
      </p>
      <h2 class="code-line" data-line-start="8" data-line-end="9"><a id="Registers_8"></a>Registers</h2>
      <p class="has-line-data" data-line-start="9" data-line-end="12">
          MIPS has 32 registers. Not including the not numbered registers lo and hi. this interpreter, however, has 19 registers, which are the following<br />
          t0 - t7, s0 - s7, lo, hi, and zero.<br />
          And while lo and hi registers can’t be accessed without there own instructions. Here you can access them just like any other register.
      </p>
      <h2 class="code-line" data-line-start="13" data-line-end="14"><a id="Labels_13"></a>Labels</h2>
      <p class="has-line-data" data-line-start="14" data-line-end="21">
          Jumping to labels in MIPS is dependent on what instruction you are using right now.<br />
          For instance. using the instruction<br />
          <code>j label</code><br />
          means that you have an offset of magnitude 26-bits to jump forward and backward.<br />
          And <code>beq $s0, $s1, label</code><br />
          means that you have an offset of magnitude 16-bits to jump forward and backward.<br />
          While in this interpreter, you don’t have any restrictions on the magnitude of your offset. You can jump forward and backward as much as you need.
      </p>
      <h2 class="code-line" data-line-start="22" data-line-end="23"><a id="LW_and_SW_22"></a>LW and SW</h2>
      <p class="has-line-data" data-line-start="23" data-line-end="31">
          lw and sw has the following format<br />
          <code>[instruction] $rt $offset(rs)</code><br />
          What this does. is that it computes the wanted memory address using the offset and the value inside rs using this formula.<br />
          location = offset + rs + 4,<br />
          where the offset is equal to the number of locations that need to be shifted times 4 However, this interpreter has up to 1024 memory locations [0, 1023]. And to reach any of them using these instructions, our formula will become.
          <br />
          location = offset + rs,<br />
          where the offset is equal to the number of locations that need to be shifted. For example, let’s say that you have the value 13 stored inside the memory location 0006. And you want to store it inside the register s0. You would want
          to write:<br />
          <code>lw $s0, 6($zero)</code>, which means takes value inside location 6 + 0, and store it inside register rs.
      </p>
      <h2 class="code-line" data-line-start="32" data-line-end="33"><a id="DIV_and_MULT_32"></a>DIV and MULT</h2>
      <p class="has-line-data" data-line-start="33" data-line-end="38">
          In the MIPS original specification, If you use the instructions mult or div, which has the following format:<br />
          <code>[instruction] $rs, $rt</code>.<br />
          The result will be stored inside the registers lo, and hi.<br />
          lo = rs / rt, and hi = rs % rt. In case of division. Or lo = lower 32-bits, and hi = higher 32-bits. In the case of multiplication.<br />
          While this is still true for the division instruction in this interpreter. there’s an exception when it comes to the multiplication instruction. Since this interpreter is made in JavaScript. And JS does not support 64-bits numbers
          nor operations on them. The whole result of the multiplication operation is stored inside the hi register.
      </p>
      <h1 class="code-line" data-line-start="39" data-line-end="40"><a id="The_few_things_that_you_need_to_know_39"></a>The few things that you need to know</h1>
      <ol>
          <li class="has-line-data" data-line-start="40" data-line-end="44">
              Operating on undefined registers and infinite loops<br />
              Operating on undefiend registers may yield to unexpected results.<br />
              You may even get stuck and an infinite loop. However, results from operating on undefined registers are not displayed in the memory nor the registers.<br />
              And also if somehow you got yourself stuck in an infinite loop the interpreter will help you to get out.
          </li>
          <li class="has-line-data" data-line-start="44" data-line-end="45">MiTerpreter supports the following instructions</li>
      </ol>
      <ul>
          <li class="has-line-data" data-line-start="45" data-line-end="46">add</li>
          <li class="has-line-data" data-line-start="46" data-line-end="47">and</li>
          <li class="has-line-data" data-line-start="47" data-line-end="48">or</li>
          <li class="has-line-data" data-line-start="48" data-line-end="49">srl</li>
          <li class="has-line-data" data-line-start="49" data-line-end="50">sub</li>
          <li class="has-line-data" data-line-start="50" data-line-end="51">xor</li>
          <li class="has-line-data" data-line-start="51" data-line-end="52">addi</li>
          <li class="has-line-data" data-line-start="52" data-line-end="53">andi</li>
          <li class="has-line-data" data-line-start="53" data-line-end="54">sll</li>
          <li class="has-line-data" data-line-start="54" data-line-end="55">slt</li>
          <li class="has-line-data" data-line-start="55" data-line-end="56">xori</li>
          <li class="has-line-data" data-line-start="56" data-line-end="57">bne</li>
          <li class="has-line-data" data-line-start="57" data-line-end="58">beq</li>
          <li class="has-line-data" data-line-start="58" data-line-end="59">bge</li>
          <li class="has-line-data" data-line-start="59" data-line-end="60">ble</li>
          <li class="has-line-data" data-line-start="60" data-line-end="61">blt</li>
          <li class="has-line-data" data-line-start="61" data-line-end="62">bgt</li>
          <li class="has-line-data" data-line-start="62" data-line-end="63">lw</li>
          <li class="has-line-data" data-line-start="63" data-line-end="64">sw</li>
          <li class="has-line-data" data-line-start="64" data-line-end="65">bgez</li>
          <li class="has-line-data" data-line-start="65" data-line-end="66">bgtz</li>
          <li class="has-line-data" data-line-start="66" data-line-end="67">blez</li>
          <li class="has-line-data" data-line-start="67" data-line-end="68">bltz</li>
          <li class="has-line-data" data-line-start="68" data-line-end="69">div</li>
          <li class="has-line-data" data-line-start="69" data-line-end="70">mult</li>
          <li class="has-line-data" data-line-start="70" data-line-end="71">j</li>
          <li class="has-line-data" data-line-start="71" data-line-end="72">li</li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'Docs'
};
</script>
