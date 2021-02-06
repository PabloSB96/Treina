package com.developm8.treina.trainer

import android.os.Bundle
import android.view.*
import androidx.appcompat.widget.Toolbar
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.developm8.treina.R
import com.developm8.treina.model.TrainerExercice

class FragmentMainTrainerMyExercices: Fragment() {

    lateinit var recyclerView: RecyclerView
    lateinit var viewAdapter: RecyclerView.Adapter<*>
    lateinit var viewManager: RecyclerView.LayoutManager

    override fun onCreateOptionsMenu(menu: Menu, inflater: MenuInflater) {
        inflater.inflate(R.menu.main_trainer_myexercices_menu, menu)
        super.onCreateOptionsMenu(menu, inflater)
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_main_trainer_myexercices, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        viewManager = LinearLayoutManager(view.context)
        viewAdapter = MainTrainerExercicesAdapter(getData(), layoutInflater)
        recyclerView = view.findViewById<RecyclerView>(R.id.recyclerViewTrainerExercices).apply {
            setHasFixedSize(true)
            layoutManager = viewManager
            adapter = viewAdapter
        }
        setHasOptionsMenu(true)
    }

    fun getData(): List<TrainerExercice> {
        val result:ArrayList<TrainerExercice> = ArrayList()
        result.add(TrainerExercice(1, "Flexiones", "Lorem ipsum"))
        result.add(TrainerExercice(1, "Abdominales", "Lorem ipsum"))
        result.add(TrainerExercice(1, "Sentadillas", "Lorem ipsum"))
        return result
    }
}