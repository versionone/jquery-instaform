
describe 'InstaForm : '
  shared_behaviors_for 'all inputs have default state'
    it 'should have inputs with default state'
      all_inputs.should.have_class 'ui-state-default'
    end
  end
  
  shared_behaviors_for 'input focused'
    describe 'is focused'
      before
        current_input.focus()
      end
      
      should_behave_like('all inputs have default state')
      
      it 'should have focus'
        current_input.should.have_class 'ui-state-focus'
      end
      
      it 'should be the only focused input'
        other_inputs.should_not.have_class 'ui-state-focus'
      end
      
      describe 'and then blurred'
        before
          current_input.blur()
        end
        
        should_behave_like('all inputs have default state')
        
        it 'should not have focus'
          current_input.should_not.have_class 'ui-state-focus'
        end
        
        it 'should have no other focused inputs'
          other_inputs.should_not.have_class 'ui-state-focus'
        end
      end
      
    end
  end
  
  shared_behaviors_for 'value changed'
    describe 'value is changed'
      before
        // only works because we never get a success or error from the ajax request
        // due to the action url on the instaform fixture. doh!
        element_classes = ''
        current_input.closest('form').instaform({
          beforeSubmit:function(){  element_classes = current_input.attr('class')}})
        current_input.val('magic mushroom').change()
      end
      
      should_behave_like('all inputs have default state')
      
      // fails in Rhino b/c the ajax request succeeds, thus removing the ui-state-active class
      it 'should be active'
        element_classes.should.include 'ui-state-active'
      end
      
      it 'should be the only active input'
        other_inputs.should_not.have_class 'ui-state-active'
      end
    end
  end
  
  shared_behaviors_for 'value changed and submitted'
    describe 'value is changed, and the form was submitted successfully'
      before
        mock_request().and_return({}, 'application/json', 200)
        current_input.change()
        request = last_request()
      end
      
      after
        //delete request
        unmock_request()
      end
      
      it 'should have used the action url'
        request.url.should.be form.attr('action')
      end
      
      it 'should have used the http method'
        request.method.toLowerCase().should.be form.attr('method').toLowerCase()
      end
      
      it 'should have used all fields and their values'
        request.data.should.be form.serialize()
      end
      
      should_behave_like('all inputs have default state')
    
      it 'should have no active inputs'
        all_inputs.should_not.have_class 'ui-state-active'
      end
    end
  end
  
  shared_behaviors_for 'submitted with error'
    describe 'value is changed, and the form was submitted unsuccessfully'
      before
        mock_request().and_return({}, 'application/json', 403)
        current_input.change()
        request = last_request()
      end
      
      after
        //delete request
        unmock_request()
      end
      
      should_behave_like('all inputs have default state')
      
      it 'should mark changed input as error'
        current_input.should.have_class 'ui-state-error'
      end
      
      it 'should not mark other inputs as error'
        other_inputs.should_not.have_class 'ui-state-error'
      end
      
      describe 'and then submitted successfully'
        before
          mock_request().and_return({}, 'application/json', 200)
          current_input.change()
          request = last_request()
        end
        
        after
          //delete request
          unmock_request()
        end
        
        it 'should have no inputs marked as error'
          all_inputs.should_not.have_class 'ui-state-error'
        end
      end
    end
  end
    
  describe 'when a form is an InstaForm'
    before
      form = elements(fixture('instaform')).instaform()
      all_inputs = $('input, textarea', form)
    end

    after
      lastRequest = null
      delete form; delete all_inputs; delete current_input; delete other_inputs
    end
  
    it 'should be a jQuery UI Widget'
      form.should.have_class 'ui-widget'
    end
    
    should_behave_like('all inputs have default state')
    
    it 'should have no inputs with focus'
      all_inputs.should_not.have_class 'ui-state-focus'
    end
    
    describe 'and an input textbox'
      before
        current_input = $("input:text", form)
        other_inputs = current_input.siblings()
      end
      
      should_behave_like('input focused')
      
      should_behave_like('value changed')
      
      should_behave_like('value changed and submitted')
      
      should_behave_like('submitted with error')
      
    end
    
    describe 'and a textarea'
      before
        current_input = $('textarea', form)
        other_inputs = current_input.siblings()
      end
      
      should_behave_like('input focused')
      
      should_behave_like('value changed')
      
      should_behave_like('value changed and submitted')
      
      should_behave_like('submitted with error')
      
    end
  
    describe 'and submitted with the default behavior'      
      it 'should prevent the default submit behavior'
        submit_handlers = form.data('events').submit
        submit_handlers.should.not.be undefined
        
        fake_submit_event = { preventDefault: function() {return 'cancel the form submit'} }
        fake_submit_event.should.receive('preventDefault')
        
        $.grep(submit_handlers, function(e, i){ return e.namespace=="instaform" })[0].handler(fake_submit_event)
      end
    end
  end
  
  describe 'when a form is an InstaForm with options'
    before
      form = elements(fixture('instaform')).instaform({ formClass:'sandwich' })
    end
    
    after
      delete form
    end
    
    it 'should be a jQuery UI Widget'
      form.should.have_class 'ui-widget'
    end
    
    it 'should respect optional formClass'
      form.should.have_class 'sandwich'
    end
  end
end
